import { API_BASE_URL } from "@/config/env";
import {
  ProductApiError,
  ProductContractError,
  ProductNotFoundError,
} from "@/errors/product";
import { api } from "@/lib/axios";
import type { Product, ProductsAPIResponse } from "@/types/product";
import { z } from "zod";

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
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
      // não é JSON válido — cai no fallback de array vazio
    }

    throw new ProductApiError(message);
  }

  const raw = await response.json();

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

export async function getProducts(
  params: Record<string, string | number>,
): Promise<ProductsAPIResponse> {
  const res = await api.get("/products", {
    params,
  });

  return res.data;
}
