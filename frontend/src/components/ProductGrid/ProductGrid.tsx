import ProductGridCard from "./ProductGridCard";

type Product = {
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

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <section className="flex w-full flex-col items-center px-4 pb-17.25">
      {title && (
        <h2 className="mb-8 font-poppins text-[40px] font-bold leading-12 text-primary-text-200">
          {title}
        </h2>
      )}

      <div className="mb-8 grid w-full max-w-309 grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {products.map((product) => (
          <ProductGridCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            currentPrice={`R$ ${product.price.toFixed(2)}`}
            offer={product.discount > 0}
            discount={product.discount}
            isNew={product.isNew}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;