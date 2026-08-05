import { useState } from "react";

export function useGallery(images: string[]) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

  return { selectedImage, setSelectedImage };
}
