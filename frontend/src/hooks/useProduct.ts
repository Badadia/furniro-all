import { ProductNotFoundError } from "@/errors/product";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProductById, getProductBySlug } from "../services/product.service";

type ProductStatus = "loading" | "success" | "notfound" | "error";

export type ProductLookupMode = "id" | "slug";

export function useProduct(identifier: string, mode: ProductLookupMode = "id") {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<ProductStatus>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    const request =
      mode === "slug"
        ? getProductBySlug(identifier)
        : getProductById(identifier);

    request
      .then((data) => {
        if (!active) return;
        setProduct(data);
        setStatus(data ? "success" : "notfound");
      })
      .catch((error: unknown) => {
        if (!active) return;

        if (error instanceof ProductNotFoundError) {
          setStatus("notfound");
          return;
        }

        setStatus("error");
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });

    return () => {
      active = false;
    };
  }, [identifier, mode, attempt]);

  return { product, status, retry: () => setAttempt((prev) => prev + 1) };
}
