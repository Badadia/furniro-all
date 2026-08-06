import toast from "react-hot-toast";
import { useCartStore } from "../../stores/cart.store";

export function CheckoutButton() {
  const clear = useCartStore((s) => s.clearCart);
  const isEmpty = useCartStore((s) => s.isEmpty());

  function handleCheckout() {
    if (isEmpty) return;

    toast.success("check out realizado com sucesso!");
    clear();
  }

  return (
    <button
      className="w-fit text-[20px] py-3.5 px-14.5 rounded-2xl border border-black cursor-pointer transition hover:scale-102"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}
