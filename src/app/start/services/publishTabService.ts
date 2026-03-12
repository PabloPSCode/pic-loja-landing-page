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
} from "@/lib/canva";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;
const PAGE_BACKGROUND = "#ffffff";
const DESCRIPTION_COLOR = "#5b5b5b";
const IMAGE_BACKGROUND = "#d6d6d6";

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

export class PublishTabService {
  static async generateProductCanvas(product: IProductData) {
    if (!product.imgUrl) {
      throw new Error("Imagem do produto não encontrada");
    }

    await ensureFontsLoaded();

    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const ctx = getCanvasContext(canvas);
    const image = await loadImage(product.imgUrl);

    ctx.fillStyle = PAGE_BACKGROUND;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawRoundedRect(ctx, {
      x: 64,
      y: 64,
      width: 952,
      height: 640,
      radius: 28,
      fillStyle: product.bgColor || IMAGE_BACKGROUND,
    });

    drawImageContain(ctx, image, 120, 120, 840, 530);

    const titleLines = drawMultilineText(ctx, {
      text: product.title,
      x: 64,
      y: 768,
      maxWidth: 952,
      lineHeight: 74,
      maxLines: 2,
      color: "#111111",
      font: "700 56px Montserrat, Sora, Arial, sans-serif",
    });

    const descriptionY = 768 + titleLines * 74 + 26;

    const descriptionLines = drawMultilineText(ctx, {
      text: product.description,
      x: 64,
      y: descriptionY,
      maxWidth: 952,
      lineHeight: 60,
      maxLines: 6,
      color: DESCRIPTION_COLOR,
      font: "400 32px Montserrat, Arial, sans-serif",
    });

    if (product.showPrice !== false) {
      const priceY = descriptionY + descriptionLines * 52 + 70;

      drawMultilineText(ctx, {
        text: formatBRL(product.price),
        x: 64,
        y: priceY,
        maxWidth: 952,
        lineHeight: 40,
        maxLines: 1,
        align: "center",
        color: "#111111",
        font: "700 68px Montserrat, Sora, Arial, sans-serif",
      });
    }

    return canvas;
  }

  static async generateProductBlob(product: IProductData) {
    const canvas = await PublishTabService.generateProductCanvas(product);
    return canvasToBlob(canvas);
  }

  static async downloadProductImage(product: IProductData) {
    const blob = await PublishTabService.generateProductBlob(product);
    const filename = `${sanitizeFilename(product.title || "produto") || "produto"}.png`;
    downloadBlob(blob, filename);
  }

  static async shareProductImage(product: IProductData) {
    const blob = await PublishTabService.generateProductBlob(product);
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
