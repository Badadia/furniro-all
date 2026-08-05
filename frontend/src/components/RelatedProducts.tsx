import ProductGridCard from "@/components/ProductGrid/ProductGridCard";
import type { Product } from "@/types/product";
import { RELATED_PRODUCTS_TITLE } from "../features/single-product/constants/messages";
import { useRelatedProducts } from "../features/single-product/hooks/useRelatedProducts";

type RelatedProductsProps = {
  product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const related = useRelatedProducts(product);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 pb-17.25">
      <h2 className="mb-8 text-center font-poppins text-[36px] font-bold leading-12 text-primary-text-200">
        {RELATED_PRODUCTS_TITLE}
      </h2>

      <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductGridCard
            key={product.id}
            product={product}
            href={`/product/${product.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
