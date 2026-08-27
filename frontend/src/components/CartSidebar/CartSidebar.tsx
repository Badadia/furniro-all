import { useEffect } from "react";
import { FiX, FiLock } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router";
import { getImage } from "../../lib/assets";
import { useCartStore } from "../../stores/cart.store";
import { calculateDiscount, formatPrice } from "../../utils/price";

export const CartSidebar = () => {
  const isOpen = useCartStore((s) => s.isSidebarOpen);
  const closeSidebar = useCartStore((s) => s.closeSidebar);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.getTotal());
  const navigate = useNavigate();

  // Fecha o drawer com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSidebar]);

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    closeSidebar();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop transparente / escuro com blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in"
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Drawer lateral direito */}
      <aside
        className="fixed top-0 right-0 h-full w-[417px] max-w-[90vw] bg-white shadow-2xl z-50 flex flex-col justify-between p-7 transform transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Topo do Sidebar */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-poppins text-2xl font-semibold text-black">
              Shopping Cart
            </h2>
            <button
              type="button"
              onClick={closeSidebar}
              className="text-[#9F9F9F] hover:text-black transition cursor-pointer p-1"
              aria-label="Close cart"
            >
              <FiLock size={20} className="hidden" />
              <FiX size={22} className="text-[#9F9F9F] hover:text-black" />
            </button>
          </div>

          <div className="mt-6 mb-6 h-[1px] w-3/4 bg-[#D9D9D9]" />

          {/* Items list with internal scroll */}
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-2 space-y-5">
            {items.length === 0 ? (
              <div className="py-12 text-center text-[#9F9F9F] font-poppins text-sm">
                Your cart is empty.
              </div>
            ) : (
              items.map((item) => {
                const discountedPrice = calculateDiscount(
                  item.price,
                  item.discount,
                );
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={getImage(item.image)}
                        alt={item.name}
                        className="h-[105px] w-[105px] rounded-lg bg-[#FAF3EA] object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-poppins text-base font-normal text-black truncate max-w-[150px]">
                          {item.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 font-poppins text-xs sm:text-sm">
                          <span className="font-medium text-black">
                            {item.quantity}
                          </span>
                          <span className="text-[10px] text-black">X</span>
                          <span className="font-medium text-[#B88E2F]">
                            {formatPrice(discountedPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[#9F9F9F] hover:text-black transition cursor-pointer flex-shrink-0"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <IoCloseCircle size={22} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Rodapé do Sidebar */}
        <div className="border-t border-[#D9D9D9] pt-6 mt-4">
          <div className="flex items-center justify-between mb-7">
            <span className="font-poppins text-base font-normal text-black">
              Subtotal
            </span>
            <span className="font-poppins text-base font-semibold text-[#B88E2F]">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[#D9D9D9] pt-6">
            <button
              type="button"
              onClick={() => handleNavigate("/cart")}
              className="flex-1 rounded-full border border-black px-6 py-2.5 text-center font-poppins text-xs font-medium text-black transition hover:bg-black hover:text-white cursor-pointer"
            >
              Cart
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/checkout")}
              className="flex-1 rounded-full border border-black px-6 py-2.5 text-center font-poppins text-xs font-medium text-black transition hover:bg-[#B88E2F] hover:border-[#B88E2F] hover:text-white cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
