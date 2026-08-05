export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const MOCK_BASE_URL =
  import.meta.env.VITE_MOCK_API_URL ?? "http://localhost:3001";
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
export const CLOUDINARY_BASE_URL =
  import.meta.env.VITE_CLOUDINARY_BASE_URL ??
  "https://res.cloudinary.com/furniro/image/upload";