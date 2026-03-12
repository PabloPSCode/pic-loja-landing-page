import { NextResponse } from "next/server";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-4o-mini";

const OBJECT_ANALYSIS_SCHEMA = {
  name: "image_object_analysis",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      title: {
        type: ["string", "null"],
      },
      description: {
        type: ["string", "null"],
      },
      containsObject: {
        type: "boolean",
      },
    },
    required: ["title", "description", "containsObject"],
  },
} as const;

interface OpenAIResponseError {
  error?: {
    message?: string;
  };
}

interface OpenAIResponseSuccess {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
}

interface ObjectAnalysisResult {
  title: string | null;
  description: string | null;
  containsObject: boolean;
}

export const runtime = "nodejs";

function isObjectAnalysisResult(value: unknown): value is ObjectAnalysisResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ObjectAnalysisResult>;

  return (
    typeof candidate.containsObject === "boolean" &&
    (typeof candidate.title === "string" || candidate.title === null) &&
    (typeof candidate.description === "string" || candidate.description === null)
  );
}

async function fileToDataUrl(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

function extractOutputText(response: OpenAIResponseSuccess) {
  if (response.output_text) {
    return response.output_text;
  }

  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && content.text) {
        return content.text;
      }
    }
  }

  return null;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json(
      { error: "Send the uploaded image in a multipart/form-data field named 'image'." },
      { status: 400 },
    );
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "The uploaded file must be an image." },
      { status: 400 },
    );
  }

  const imageDataUrl = await fileToDataUrl(image);

  const openAIResponse = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions:
        "You analyze a single uploaded image and decide whether it clearly contains one main physical object. Return containsObject=true only when there is a single identifiable object that can be described for a product-like title and description. If there is no clear object, multiple competing objects, only scenery, text, abstract art, or the image is too ambiguous, return title=null, description=null, containsObject=false. The response must title and description must be returned in Portuguese BR, it should be concise and consider the Brazilian context. The returned language must be descritive, gramatically and ortographically correct, persuasive and point some details of the object present in the image helping to sell it. If the object present in the image has techinical details that can be identified, include them in the description. Do not provide techinical details you are not sure, like object production year, year of manufacture of the vehicle, and any data that is not possible to prove. Always return a title and description even if the image is of low quality or contains a single object. The description should not return around 200 and 240 characteres.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Inspect this uploaded image and respond using the required JSON schema.",
            },
            {
              type: "input_image",
              image_url: imageDataUrl,
              detail: "high",
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...OBJECT_ANALYSIS_SCHEMA,
        },
      },
    }),
  });

  if (!openAIResponse.ok) {
    const errorPayload = (await openAIResponse.json().catch(() => null)) as OpenAIResponseError | null;

    return NextResponse.json(
      {
        error:
          errorPayload?.error?.message ||
          "OpenAI request failed while analyzing the image.",
      },
      { status: openAIResponse.status },
    );
  }

  const payload = (await openAIResponse.json()) as OpenAIResponseSuccess;
  const outputText = extractOutputText(payload);

  if (!outputText) {
    return NextResponse.json(
      { error: "OpenAI did not return structured output text." },
      { status: 502 },
    );
  }

  let parsedResult: unknown;

  try {
    parsedResult = JSON.parse(outputText);
  } catch {
    return NextResponse.json(
      { error: "OpenAI returned invalid JSON output." },
      { status: 502 },
    );
  }

  if (!isObjectAnalysisResult(parsedResult)) {
    return NextResponse.json(
      { error: "OpenAI returned an unexpected response shape." },
      { status: 502 },
    );
  }

  return NextResponse.json(parsedResult);
}
