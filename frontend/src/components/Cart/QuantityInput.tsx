import { useCartStore } from "../../stores/cart.store";

type QuantityInputProps = {
  id: string;
};

export function QuantityInput({ id }: QuantityInputProps) {
  const total = useCartStore((s) => s.getItemQuantity(id));
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);

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
        readOnly
        className=" w-10 text-center outline-none
                   [&::-webkit-inner-spin-button]:appearance-none
                   [&::-webkit-outer-spin-button]:appearance-none
                   [-moz-appearance:textfield]"
      />

      <button
        type="button"
        onClick={() => increase(id)}
        className="flex cursor-pointer items-center justify-center px-3 py-3.5 transition hover:bg-footer-gray/10"
      >
        +
      </button>
    </div>
  );
}
