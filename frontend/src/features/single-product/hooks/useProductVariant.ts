import { useCartStore } from "@/stores/cart.store";
import type { Product } from "@/types/product";
import { useState } from "react";
import toast from "react-hot-toast";
import { ADDED_TO_CART_MESSAGE } from "../constants/messages";
import { validateVariant } from "../utils/validateVariant";

export function useProductVariant(product: Product) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");

  const addToCart = () => {
    const error = validateVariant(selectedSize, selectedColor);

    if (error) {
      toast.error(error);
      return;
    }

    addItem(product);
    toast.success(`${product.name} ${ADDED_TO_CART_MESSAGE}`);
  };

  return {
    selectedSize,
    selectedColor,
    setSelectedSize,
    setSelectedColor,
    addToCart,
  };
}
