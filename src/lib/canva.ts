"use client";

export interface RoundedRectOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
}

export interface DrawTextOptions {
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  lineHeight: number;
  maxLines?: number;
  align?: CanvasTextAlign;
  color: string;
  font: string;
}

export interface DrawImageContainOptions {
  clip?: boolean;
  scaleMultiplier?: number;
}

export function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function getCanvasContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Falha ao criar contexto do canvas");
  }

  return ctx;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  {
    x,
    y,
    width,
    height,
    radius,
    fillStyle,
    strokeStyle,
    lineWidth = 0,
  }: RoundedRectOptions,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  if (strokeStyle && lineWidth > 0) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

export async function loadImage(src: string) {
  let resolvedSrc = src;

  if (
    /^https?:\/\//.test(src) &&
    typeof window !== "undefined" &&
    !src.startsWith(window.location.origin)
  ) {
    resolvedSrc = `/api/image-proxy?url=${encodeURIComponent(src)}`;
  }

  const image = new Image();

  if (/^https?:\/\//.test(resolvedSrc)) {
    image.crossOrigin = "anonymous";
  }

  image.decoding = "async";
  image.src = resolvedSrc;

  await image.decode();
  return image;
}

export function drawImageContain(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number,
  options?: DrawImageContainOptions,
) {
  const source = image as HTMLImageElement;
  const scale =
    Math.min(width / source.width, height / source.height) *
    (options?.scaleMultiplier ?? 1);
  const drawWidth = source.width * scale;
  const drawHeight = source.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  if (options?.clip) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
  }

  ctx.drawImage(source, drawX, drawY, drawWidth, drawHeight);

  if (options?.clip) {
    ctx.restore();
  }
}

export function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = Number.POSITIVE_INFINITY,
) {
  const normalizedText = text.trim().replace(/\s+/g, " ");

  if (!normalizedText) {
    return [];
  }

  const words = normalizedText.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (ctx.measureText(nextLine).width <= maxWidth) {
      currentLine = nextLine;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const truncated = lines.slice(0, maxLines);
  const lastLine = truncated[maxLines - 1] ?? "";
  let ellipsized = `${lastLine}...`;

  while (ctx.measureText(ellipsized).width > maxWidth && ellipsized.length > 3) {
    ellipsized = `${ellipsized.slice(0, -4)}...`;
  }

  truncated[maxLines - 1] = ellipsized;
  return truncated;
}

export function drawMultilineText(
  ctx: CanvasRenderingContext2D,
  {
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    maxLines,
    align = "left",
    color,
    font,
  }: DrawTextOptions,
) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "top";

  const lines = wrapTextLines(ctx, text, maxWidth, maxLines);
  const drawX = align === "center" ? x + maxWidth / 2 : x;

  lines.forEach((line, index) => {
    ctx.fillText(line, drawX, y + index * lineHeight);
  });

  ctx.restore();

  return lines.length;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality = 1,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Falha ao gerar blob do canvas"));
    }, type, quality);
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}
