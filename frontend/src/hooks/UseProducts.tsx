import type { Product } from "@/types/product";
import axios from "axios";
import { useEffect, useState } from "react";

type UseProductsProps = {
  category?: string;
  sort?: string;
  limit: number;
  offset: number;
};

export const useProducts = ({
  category = "all",
  sort = "default",
  limit,
  offset,
}: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const page = offset / limit + 1;

        const params: Record<string, string | number> = {
          _page: page,
          _limit: limit,
        };

        if (category !== "all") {
          params.category = category;
        }

        if (sort === "price_asc") {
          params._sort = "price";
          params._order = "asc";
        }

        if (sort === "price_desc") {
          params._sort = "price";
          params._order = "desc";
        }

        const response = await axios.get("http://localhost:3000/products", {
          params,
        });

        setProducts(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort, limit, offset]);

  return {
    products,
    total,
    loading,
  };
};
