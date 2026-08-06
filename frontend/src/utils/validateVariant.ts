import { SELECT_COLOR_ERROR, SELECT_SIZE_ERROR } from "../constants/messages";

export function validateVariant(
  selectedSize: string,
  selectedColor: string,
): string | null {
  if (!selectedSize) {
    return SELECT_SIZE_ERROR;
  }

  if (!selectedColor) {
    return SELECT_COLOR_ERROR;
  }

  return null;
}
