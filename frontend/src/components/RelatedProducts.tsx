import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid/ProductGrid";

type RelatedProductsProps = {
  product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const { products } = useProducts({
    limit: 5,
    offset: 0,
    category: product.category,
  });

  if (products.length === 0) {
    return null;
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);

  return <ProductGrid products={relatedProducts} title="Related Products" />;
};

export default RelatedProducts;
