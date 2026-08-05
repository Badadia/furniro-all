type ProductGridCardProps = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  isNew: boolean;
};

const ProductGridCard = ({
  image,
  name,
  description,
  price,
  discount,
  isNew,
}: ProductGridCardProps) => {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);

  return (
    <article className="group relative min-w-71.25 overflow-hidden bg-card-product">
      <div className="relative h-75.25 w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />

        {discount > 0 && (
          <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#E97171] font-poppins text-[16px] font-medium text-primary">
            -{discount}%
          </span>
        )}

        {isNew && (
          <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#2EC1AC] font-poppins text-[16px] font-medium text-primary">
            New
          </span>
        )}
      </div>

      <div className="px-4 py-4">
        <h3 className="font-poppins text-[24px] font-semibold text-primary-text-200">
          {name}
        </h3>

        <p className="mt-2 font-poppins text-[16px] text-over-card-product">
          {description}
        </p>

        <p className="mt-2 font-poppins font-semibold text-primary-text-200">
          {formattedPrice}
        </p>
      </div>

      {/* Área de ações no hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/60 opacity-0 transition duration-300 group-hover:opacity-100">
        <button
          type="button"
          className="h-12 w-55.25 bg-primary font-poppins text-[16px] font-semibold text-over-secundary"
        >
          Add to cart
        </button>

        <div className="flex w-full justify-around px-4">
          <button
            type="button"
            className="font-poppins text-sm font-semibold text-primary"
          >
            Share
          </button>

          <button
            type="button"
            className="font-poppins text-sm font-semibold text-primary"
          >
            Compare
          </button>

          <button
            type="button"
            className="font-poppins text-sm font-semibold text-primary"
          >
            Like
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductGridCard;