import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { getRelatedProducts } from "../services/product.service";

export function useRelatedProducts(
  product: Pick<Product, "id" | "category">,
) {
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;

    getRelatedProducts(product.category, product.id, 4).then((items) => {
      if (active) {
        setRelated(items);
      }
    });

    return () => {
      active = false;
    };
  }, [product.category, product.id]);

  return related;
}
