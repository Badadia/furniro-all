import { ADDED_TO_CART_MESSAGE } from "@/features/single-product/constants/messages";
import toast from "react-hot-toast";
import { useCartStore, type Product } from "../../stores/cart.store";

type QuantityInputProps = {
  id: string;
  item?: Product;
};

export function QuantityInput({ id, item }: QuantityInputProps) {
  const total = useCartStore((s) => s.getItemQuantity(id));
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);
  const addItem = useCartStore((s) => s.addItem);

  const increaseQuantity = () => {
    if (total === 0) {
      addItem(item!);
      toast.success(`${item!.name} ${ADDED_TO_CART_MESSAGE}`);
    } else increase(id);
  };

  return (
    <div className="inline-flex w-fit overflow-hidden rounded-[10px] border border-footer-gray">
      <button
        type="button"
        onClick={() => decrease(id)}
        className="flex cursor-pointer items-center justify-center px-3 py-3.5 transition hover:bg-footer-gray/10"
      >
        -
      </button>

      <input
        value={total}
        type="number"
        className=" w-10 text-center outline-none
                   [&::-webkit-inner-spin-button]:appearance-none
                   [&::-webkit-outer-spin-button]:appearance-none
                   [-moz-appearance:textfield]"
      />

      <button
        type="button"
        onClick={increaseQuantity}
        className="flex cursor-pointer items-center justify-center px-3 py-3.5 transition hover:bg-footer-gray/10"
      >
        +
      </button>
    </div>
  );
}
