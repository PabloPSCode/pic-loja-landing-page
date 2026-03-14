"use client";

import type { IProductData } from "@/components/cards/ShareControllerCard";
import { formatBRL } from "@/utils/format";
import {
  canvasToBlob,
  createCanvas,
  downloadBlob,
  drawImageContain,
  drawMultilineText,
  drawRoundedRect,
  getCanvasContext,
  loadImage,
  wrapTextLines,
} from "@/lib/canva";

const CANVAS_WIDTH = 1080;
const PAGE_BACKGROUND = "#ffffff";
const DESCRIPTION_COLOR = "#5b5b5b";
const IMAGE_BACKGROUND = "#d6d6d6";
const IMAGE_FRAME_X = 64;
const IMAGE_FRAME_Y = 64;
const IMAGE_FRAME_WIDTH = 952;
const IMAGE_FRAME_HEIGHT = 640;
const CORNER_PADDING = 32;
const PRICE_BADGE_HEIGHT = 96;
const PRICE_BADGE_MIN_WIDTH = 260;
const AVATAR_SIZE = 96;
const TITLE_X = 64;
const TITLE_Y = 768;
const TITLE_MAX_WIDTH = 952;
const TITLE_LINE_HEIGHT = 74;
const TITLE_MAX_LINES = 2;
const TITLE_FONT = "700 56px Montserrat, Sora, Arial, sans-serif";
const DESCRIPTION_TOP_GAP = 26;
const DESCRIPTION_X = 64;
const DESCRIPTION_MAX_WIDTH = 952;
const DESCRIPTION_LINE_HEIGHT = 60;
const DESCRIPTION_FONT = "400 32px Montserrat, Arial, sans-serif";
const CONTENT_BOTTOM_PADDING = 96;

interface ProductRenderOptions {
  avatarUrl?: string;
}

function sanitizeFilename(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureFontsLoaded() {
  if ("fonts" in document) {
    await document.fonts.ready;
  }
}

function resolveCanvasHeight(product: IProductData) {
  const measureCanvas = createCanvas(1, 1);
  const measureCtx = getCanvasContext(measureCanvas);

  measureCtx.font = TITLE_FONT;
  const titleLines = wrapTextLines(
    measureCtx,
    product.title,
    TITLE_MAX_WIDTH,
    TITLE_MAX_LINES,
  );

  measureCtx.font = DESCRIPTION_FONT;
  const descriptionLines = wrapTextLines(
    measureCtx,
    product.description,
    DESCRIPTION_MAX_WIDTH,
  );

  const titleLineCount = Math.max(1, titleLines.length);
  const descriptionLineCount = Math.max(1, descriptionLines.length);
  const descriptionY =
    TITLE_Y + titleLineCount * TITLE_LINE_HEIGHT + DESCRIPTION_TOP_GAP;

  return (
    descriptionY +
    descriptionLineCount * DESCRIPTION_LINE_HEIGHT +
    CONTENT_BOTTOM_PADDING
  );
}

function drawPriceBadge(ctx: CanvasRenderingContext2D, formattedPrice: string) {
  ctx.save();
  ctx.font = "700 40px Montserrat, Sora, Arial, sans-serif";

  const textWidth = ctx.measureText(formattedPrice).width;
  const badgeWidth = Math.max(PRICE_BADGE_MIN_WIDTH, textWidth + 64);
  const badgeX = IMAGE_FRAME_X + CORNER_PADDING;
  const badgeY = IMAGE_FRAME_Y + CORNER_PADDING;

  ctx.shadowColor = "rgba(15, 23, 42, 0.12)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;

  drawRoundedRect(ctx, {
    x: badgeX,
    y: badgeY,
    width: badgeWidth,
    height: PRICE_BADGE_HEIGHT,
    radius: 28,
    fillStyle: "#ffffff",
  });

  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#111111";
  ctx.textBaseline = "middle";
  ctx.fillText(
    formattedPrice,
    badgeX + 32,
    badgeY + PRICE_BADGE_HEIGHT / 2 + 2,
  );
  ctx.restore();
}

async function drawAvatarLogo(
  ctx: CanvasRenderingContext2D,
  avatarUrl?: string,
) {
  if (!avatarUrl) {
    return;
  }

  let avatarImage: HTMLImageElement;

  try {
    avatarImage = await loadImage(avatarUrl);
  } catch {
    return;
  }

  const avatarX = IMAGE_FRAME_X + IMAGE_FRAME_WIDTH - AVATAR_SIZE - CORNER_PADDING;
  const avatarY = IMAGE_FRAME_Y + CORNER_PADDING;
  const avatarRadius = AVATAR_SIZE / 2;

  ctx.save();
  ctx.shadowColor = "rgba(15, 23, 42, 0.14)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;

  ctx.beginPath();
  ctx.arc(
    avatarX + avatarRadius,
    avatarY + avatarRadius,
    avatarRadius,
    0,
    Math.PI * 2,
  );
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.beginPath();
  ctx.arc(
    avatarX + avatarRadius,
    avatarY + avatarRadius,
    avatarRadius - 6,
    0,
    Math.PI * 2,
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatarImage, avatarX + 6, avatarY + 6, AVATAR_SIZE - 12, AVATAR_SIZE - 12);
  ctx.restore();
}

export class PublishTabService {
  static async generateProductCanvas(
    product: IProductData,
    options?: ProductRenderOptions,
  ) {
    if (!product.imageUrl) {
      throw new Error("Imagem do produto não encontrada");
    }

    await ensureFontsLoaded();

    const canvas = createCanvas(CANVAS_WIDTH, resolveCanvasHeight(product));
    const ctx = getCanvasContext(canvas);
    const image = await loadImage(product.imageUrl);

    ctx.fillStyle = PAGE_BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoundedRect(ctx, {
      x: IMAGE_FRAME_X,
      y: IMAGE_FRAME_Y,
      width: IMAGE_FRAME_WIDTH,
      height: IMAGE_FRAME_HEIGHT,
      radius: 28,
      fillStyle: product.bgColor || IMAGE_BACKGROUND,
    });

    drawImageContain(ctx, image, 120, 120, 840, 530);

    if (product.showPrice !== false) {
      drawPriceBadge(ctx, formatBRL(product.price));
    }

    if (product.showLogo !== false) {
      await drawAvatarLogo(ctx, options?.avatarUrl);
    }

    const titleLines = drawMultilineText(ctx, {
      text: product.title,
      x: TITLE_X,
      y: TITLE_Y,
      maxWidth: TITLE_MAX_WIDTH,
      lineHeight: TITLE_LINE_HEIGHT,
      maxLines: TITLE_MAX_LINES,
      color: "#111111",
      font: TITLE_FONT,
    });

    const descriptionY =
      TITLE_Y + titleLines * TITLE_LINE_HEIGHT + DESCRIPTION_TOP_GAP;

    drawMultilineText(ctx, {
      text: product.description,
      x: DESCRIPTION_X,
      y: descriptionY,
      maxWidth: DESCRIPTION_MAX_WIDTH,
      lineHeight: DESCRIPTION_LINE_HEIGHT,
      color: DESCRIPTION_COLOR,
      font: DESCRIPTION_FONT,
    });

    return canvas;
  }

  static async generateProductBlob(
    product: IProductData,
    options?: ProductRenderOptions,
  ) {
    const canvas = await PublishTabService.generateProductCanvas(product, options);
    return canvasToBlob(canvas);
  }

  static async downloadProductImage(
    product: IProductData,
    options?: ProductRenderOptions,
  ) {
    const blob = await PublishTabService.generateProductBlob(product, options);
    const filename = `${sanitizeFilename(product.title || "produto") || "produto"}.png`;
    downloadBlob(blob, filename);
  }

  static async shareProductImage(
    product: IProductData,
    options?: ProductRenderOptions,
  ) {
    const blob = await PublishTabService.generateProductBlob(product, options);
    const filename = `${sanitizeFilename(product.title || "produto") || "produto"}.png`;
    const file = new File([blob], filename, { type: "image/png" });

    if (
      navigator.canShare &&
      navigator.share &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        title: product.title,
        text: product.description,
        files: [file],
      });
      return;
    }

    downloadBlob(blob, filename);
  }
}
