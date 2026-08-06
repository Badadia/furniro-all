import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid/ProductGrid";
import { ProductGridSkeleton } from "./Skeletons/ProductGridSkeleton";

type RelatedProductsProps = {
  product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const { products, loading } = useProducts({
    limit: 5,
    category: product.category,
  });

  if (products.length === 0 && !loading) {
    return null;
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);

  return loading ? (
    <ProductGridSkeleton count={4} title="Related Products" />
  ) : (
    <ProductGrid products={relatedProducts} title="Related Products" />
  );
};

export default RelatedProducts;
