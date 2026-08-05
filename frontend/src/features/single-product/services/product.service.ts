import { z } from "zod";
import type { Product } from "@/types/product";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const MOCK_BASE_URL = import.meta.env.VITE_MOCK_API_URL ?? "http://localhost:3001";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export class ProductNotFoundError extends Error {
  constructor(message = "Product not found.") {
    super(message);
    this.name = "ProductNotFoundError";
  }
}

export class ProductApiError extends Error {
  constructor(message = "Something went wrong. Please try again.") {
    super(message);
    this.name = "ProductApiError";
  }
}

export class ProductContractError extends Error {
  constructor(details: string) {
    super(`API response does not match the expected contract.\n${details}`);
    this.name = "ProductContractError";
  }
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      // não é JSON válido — cai no fallback de array vazio
    }
  }

  return [];
}

const ProductSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.union([z.number(), z.string()]).transform(Number),
  discount: z.union([z.number(), z.string()]).transform(Number).default(0),
  description: z.string(),
  fullDescription: z.string(),
  additionalInfo: z.string(),
  image: z.string(),
  additionalImages: z.preprocess(parseStringArray, z.array(z.string())),
  colors: z.preprocess(parseStringArray, z.array(z.string())),
  sizes: z.preprocess(parseStringArray, z.array(z.string())),
  isNew: z.boolean().default(false),
});

function unwrapPayload(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data[0];
  }

  if (
    data !== null &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  ) {
    const inner = (data as { data: unknown[] }).data;
    return inner[0];
  }

  return data;
}

function unwrapListPayload(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data !== null &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  ) {
    return (data as { data: unknown[] }).data;
  }

  return [];
}

function validateProduct(raw: unknown): Product {
  const result = ProductSchema.safeParse(raw);

  if (!result.success) {
    throw new ProductContractError(z.prettifyError(result.error));
  }

  return result.data;
}

async function fetchOrThrow(url: string): Promise<Response> {
  try {
    return await fetch(url);
  } catch {
    throw new ProductApiError(
      "Cannot reach the server. Check your connection and try again.",
    );
  }
}

async function fetchProduct(
  identifier: string,
  bySlug: boolean,
): Promise<Product | null> {
  if (!identifier) {
    throw new ProductNotFoundError();
  }

  let raw: unknown;

  if (USE_MOCK && !bySlug) {
    const response = await fetchOrThrow(`${MOCK_BASE_URL}/singleProducts/${identifier}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new ProductNotFoundError();
      }
      throw new ProductApiError(`Failed to fetch product (HTTP ${response.status}).`);
    }

    raw = await response.json();
  } else {
    const url = bySlug
      ? `${API_BASE_URL}/products/slug/${encodeURIComponent(identifier)}`
      : `${API_BASE_URL}/products/${encodeURIComponent(identifier)}`;

    const response = await fetchOrThrow(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new ProductNotFoundError();
      }

      let message = `Failed to fetch product (HTTP ${response.status}).`;
      try {
        const body: unknown = await response.json();
        if (
          body !== null &&
          typeof body === "object" &&
          "error" in body &&
          typeof (body as { error: string }).error === "string"
        ) {
          message = (body as { error: string }).error;
        }
      } catch {
        // fallback para a mensagem padrão
      }

      throw new ProductApiError(message);
    }

    raw = await response.json();
  }

  const payload = unwrapPayload(raw);

  if (payload === undefined || payload === null) {
    return null;
  }

  return validateProduct(payload);
}

export function getProductById(id: string): Promise<Product | null> {
  return fetchProduct(id, false);
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return fetchProduct(slug, true);
}

export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit = 4,
): Promise<Product[]> {
  try {
    const url = USE_MOCK
      ? `${MOCK_BASE_URL}/singleProducts?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`;

    const response = await fetch(url);

    if (!response.ok) {
      return [];
    }

    const raw: unknown = await response.json();
    const payload = unwrapListPayload(raw);

    const products: Product[] = [];

    for (const item of payload) {
      const result = ProductSchema.safeParse(item);
      if (result.success && result.data.id !== excludeId) {
        products.push(result.data);
      }
      if (products.length >= limit) {
        break;
      }
    }

    return products;
  } catch {
    return [];
  }
}
