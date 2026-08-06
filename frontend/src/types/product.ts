export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  description: string;
  fullDescription: string;
  additionalInfo: string;
  image: string;
  additionalImages: string[];
  colors: string[];
  sizes: string[];
  isNew: boolean;
}

export type ProductsAPIResponse = {
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
};
