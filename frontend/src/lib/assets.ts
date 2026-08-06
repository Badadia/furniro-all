import { CLOUDINARY_BASE_URL } from "../config/env";

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function basename(path: string): string {
  const segments = path.split("/");
  return segments[segments.length - 1];
}

export function getImage(name: string): string {
  if (isAbsoluteUrl(name)) {
    return name;
  }

  return `${CLOUDINARY_BASE_URL}/${basename(name)}`;
}
