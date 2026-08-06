import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../../stores/cart.store";

export function RemoveItem({ id }: { id: string }) {
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <button className="w-fit" onClick={() => removeItem(id)}>
      <FaTrash className="text-over-secundary w-5 h-5 transition cursor-pointer hover:scale-110" />
    </button>
  );
}
