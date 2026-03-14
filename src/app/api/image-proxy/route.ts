import { NextRequest } from "next/server";

function isAllowedProtocol(url: URL) {
  return url.protocol === "http:" || url.protocol === "https:";
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter.", { status: 400 });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return new Response("Invalid url parameter.", { status: 400 });
  }

  if (!isAllowedProtocol(parsedUrl)) {
    return new Response("Unsupported url protocol.", { status: 400 });
  }

  const upstreamResponse = await fetch(parsedUrl, {
    cache: "no-store",
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new Response("Unable to fetch image.", { status: 502 });
  }

  const contentType =
    upstreamResponse.headers.get("content-type") ?? "application/octet-stream";
  const cacheControl =
    upstreamResponse.headers.get("cache-control") ??
    "public, max-age=3600, s-maxage=3600";

  return new Response(upstreamResponse.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  });
}
