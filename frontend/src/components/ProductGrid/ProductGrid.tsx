import ProductGridCard from "./ProductGridCard";

export type Product = {
  id: string;
  sku: string;
  image: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  isNew: boolean;
};

type ProductGridProps = {
  products: Product[];
  title?: string;
};

const ProductGrid = ({
  products,
  title = "Our Products",
}: ProductGridProps) => {
  return (
    <section className="flex w-full flex-col items-center px-4 pb-17.25">
      {title && (
  <h2 className="mb-8 font-poppins text-[40px] font-bold leading-12 text-primary-text-200">
    {title}
  </h2>
)}

      <div className="grid w-full max-w-309 grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductGridCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;