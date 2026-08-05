import type { ReactNode } from "react";

export type ProductDetailsTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export interface ProductDetailsProps {
  tabs: ProductDetailsTab[];
  images: string[];
}
