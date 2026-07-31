import { useState, useEffect } from "react";
import ProductGridCard from "./ProductGridCard";
import ProductGridButton from "./ProductGridButton";

type Product = {
  id: number;
  image: string;
  name: string;
  description: string;
  currentPrice: string;
  offer: boolean;
  oldPrice?: string;
  discount?: number;
  isNew: boolean;
};

const INITIAL_PRODUCTS = 8;
const PRODUCTS_PER_CLICK = 4;

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const hasMoreProducts = visibleCount < products.length;

  return (
    <section className="flex w-full flex-col items-center px-4 pb-17.25">
      <h2 className="mb-8 font-poppins text-[40px] font-bold leading-12 text-primary-text-200">
        Our Products
      </h2>
      <div className="mb-8 grid w-full max-w-309 grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, visibleCount).map((product) => (
          <ProductGridCard key={product.id} {...product} />
        ))}
      </div>
      <ProductGridButton
        label={hasMoreProducts ? "Show More" : "No More"}
        disabled={!hasMoreProducts}
        onClick={() =>
          setVisibleCount((current) =>
            Math.min(current + PRODUCTS_PER_CLICK, products.length),
          )
        }
      />
    </section>
  );
};
export default ProductGrid;