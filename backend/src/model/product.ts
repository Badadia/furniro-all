import { Product } from "@prisma/client";

export type { Product } from "@prisma/client";

export type ProductCreateDTO = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type ProductUpdateDTO = Partial<
  Omit<Product, "id" | "createdAt" | "updatedAt">
>;

export interface ProductQueryParams {
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: "price_asc" | "price_desc";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
