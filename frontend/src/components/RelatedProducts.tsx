import type { Product } from "@/types/product";
import { useRelatedProducts } from "../features/single-product/hooks/useRelatedProducts";
import ProductGrid from "./ProductGrid/ProductGrid";

type RelatedProductsProps = {
  product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const related = useRelatedProducts(product);

  if (related.length === 0) {
    return null;
  }

  return <ProductGrid products={related} title="Related Products" />;
};

export default RelatedProducts;
