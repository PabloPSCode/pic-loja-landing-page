import { NextResponse } from "next/server";

const DEFAULT_REMOVE_BG_PROCESS_URL = "http://127.0.0.1:4000/process";
const configuredRemoveBgUrl = process.env.REMOVE_BG_PROCESS_URL?.replace(
  /\/+$/,
  "",
);
const REMOVE_BG_PROCESS_URL = configuredRemoveBgUrl
  ? configuredRemoveBgUrl.endsWith("/process")
    ? configuredRemoveBgUrl
    : `${configuredRemoveBgUrl}/process`
  : DEFAULT_REMOVE_BG_PROCESS_URL;
const REMOVE_BG_VERIFY_TOKEN =
  process.env.REMOVE_BG_VERIFY_TOKEN ?? process.env.BG_VERIFY_TOKEN;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (!formData.has("image")) {
    return NextResponse.json(
      {
        error:
          "Send the uploaded image in a multipart/form-data field named 'image'.",
      },
      { status: 400 },
    );
  }

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(REMOVE_BG_PROCESS_URL, {
      method: "POST",
      headers: REMOVE_BG_VERIFY_TOKEN
        ? {
            "x-verify-token": REMOVE_BG_VERIFY_TOKEN,
          }
        : undefined,
      body: formData,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          `Could not connect to the remove-bg service at ${REMOVE_BG_PROCESS_URL}.`,
      },
      { status: 502 },
    );
  }

  const contentType = upstreamResponse.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const json = await upstreamResponse.json().catch(() => null);

    return NextResponse.json(json, {
      status: upstreamResponse.status,
    });
  }

  const responseHeaders = new Headers();
  const upstreamContentDisposition = upstreamResponse.headers.get(
    "content-disposition",
  );

  responseHeaders.set(
    "content-type",
    contentType || "application/octet-stream",
  );

  if (upstreamContentDisposition) {
    responseHeaders.set("content-disposition", upstreamContentDisposition);
  }

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}
