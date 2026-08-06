import clsx from "clsx";
import { Link } from "react-router";
import { useCartStore } from "../../stores/cart.store";

type RightMenuProps = {
  className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
  const totalItems = useCartStore((s) => s.getTotalItems());

  const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
  return (
    <div className={clsx("flex gap-[33.66px]", className)}>
      <a className={clsx(LinkHover)}>
        <img
          src="/Icons/alert.svg"
          alt="Ícone de alerta"
          className={clsx("max-h-[18.66px]")}
        />
      </a>
      <Link to="/cart" className={clsx(LinkHover, "relative")}>
        <img
          src="/Icons/shop.svg"
          alt="Ícone de usuário"
          className={clsx("max-h-[22.05px]")}
        />
        {totalItems > 0 && (
          <span
            className={clsx(
              "absolute -top-3 -right-3",
              "w-4.5 h-4.5",
              "rounded-full",
              "bg-over-secundary",
              "text-white text-xs font-bold",
              "flex justify-center items-center",
            )}
          >
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
};
export default RightMenu;
