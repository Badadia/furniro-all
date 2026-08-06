import type { Product } from "@/types/product";
import type { ProductDetailsTab } from "../components/ProductDetails/types";
import {
  ADDITIONAL_INFORMATION_TAB_LABEL,
  DESCRIPTION_TAB_LABEL,
} from "../constants/messages";

export function buildProductTabs(product: Product): ProductDetailsTab[] {
  return [
    {
      id: "description",
      label: DESCRIPTION_TAB_LABEL,
      content: <p>{product.fullDescription}</p>,
    },
    {
      id: "additional",
      label: ADDITIONAL_INFORMATION_TAB_LABEL,
      content: <p>{product.additionalInfo}</p>,
    },
  ];
}
