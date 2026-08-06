import { useCartStore } from "../../stores/cart.store";
import { CartItem } from "./CartItem";

export function CartList() {
  const items = useCartStore((s) => s.items);
  const isEmpty = useCartStore((s) => s.isEmpty());

  if (isEmpty) {
    return (
      <div className="flex mt-16 items-center justify-center text-2xl font-medium">
        Your cart is empty.
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </>
  );
}
