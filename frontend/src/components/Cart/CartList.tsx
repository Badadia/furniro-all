import { useCartStore } from "../../stores/cart.store";
import { CartItem } from "./CartItem";

export function CartList() {
  const items = useCartStore((s) => s.items);

  return (
    <>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </>
  );
}
