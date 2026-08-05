import toast from "react-hot-toast";
import { useCartStore } from "../../stores/cart.store";

type ProductGridCardProps = {
  id: string;
  sku: string;
  image: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  isNew: boolean;
};

const ProductGridCard = ({
  id,
  sku,
  image,
  name,
  description,
  price,
  discount,
  isNew,
}: ProductGridCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);

  function handleAddToCart() {
    addItem({
      id,
      sku,
      name,
      price,
      discount,
      image,
    });

    toast.success(`${name} adicionado ao carrinho!`);
  }

  return (
    <article className="group relative min-w-71.25 overflow-hidden bg-card-product">
      <div
        className="relative h-75.25 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {discount > 0 && (
          <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#E97171] text-primary">
            -{discount}%
          </span>
        )}

        {isNew && (
          <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#2EC1AC] text-primary">
            New
          </span>
        )}
      </div>

      <div className="px-4 py-4">
        <h3 className="font-poppins text-[24px] font-semibold">
          {name}
        </h3>

        <p className="mt-2">
          {description}
        </p>

        <p className="mt-2 font-semibold">
          {formattedPrice}
        </p>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70 opacity-0 transition duration-300 group-hover:opacity-100">
        <button
          type="button"
          onClick={handleAddToCart}
          className="z-10 h-12 w-55 cursor-pointer bg-white font-semibold"
        >
          Add to cart
        </button>

        <div className="z-10 flex w-full items-center justify-between px-4">

  <button
    type="button"
    className="flex items-center gap-1 font-poppins text-[16px] font-semibold text-white transition hover:opacity-80"
  >
    <img src="/Icons/share.svg" alt="Share" />
    Share
  </button>

  <button
    type="button"
    className="flex items-center gap-1 font-poppins text-[16px] font-semibold text-white transition hover:opacity-80"
  >
    <img src="/Icons/compare.svg" alt="Compare" />
    Compare
  </button>

  <button
    type="button"
    className="flex items-center gap-1 font-poppins text-[16px] font-semibold text-white transition hover:opacity-80"
  >
    <img src="/Icons/like.svg " alt="Like" />
    Like
  </button>
</div>
      </div>
    </article>
  );
};

export default ProductGridCard;