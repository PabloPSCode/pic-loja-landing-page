export const DEFAULT_PRODUCT_IMAGE_SCALE = 1;
export const MIN_PRODUCT_IMAGE_SCALE = 0.6;
export const MAX_PRODUCT_IMAGE_SCALE = 2.4;
export const PRODUCT_IMAGE_SCALE_STEP = 0.1;

export function clampProductImageScale(scale?: number) {
  if (typeof scale !== "number" || !Number.isFinite(scale)) {
    return DEFAULT_PRODUCT_IMAGE_SCALE;
  }

  return Math.min(
    MAX_PRODUCT_IMAGE_SCALE,
    Math.max(MIN_PRODUCT_IMAGE_SCALE, Math.round(scale * 100) / 100),
  );
}
