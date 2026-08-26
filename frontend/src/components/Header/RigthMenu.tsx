import { useState } from "react";
import clsx from "clsx";
import { FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import { useCartStore } from "../../stores/cart.store";

type RightMenuProps = {
  className?: string;
};

const RightMenu = ({ className }: RightMenuProps) => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const toggleSidebar = useCartStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const LinkHover = "hover:cursor-pointer hover:scale-110 transition";

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <div className={clsx("flex items-center gap-[33.66px]", className)}>
      {/* Ícone de Usuário / Login / Logout */}
      <div className="relative">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={clsx(
                LinkHover,
                "flex items-center gap-1.5 rounded-full bg-[#FAF3EA] px-3 py-1 text-xs font-medium text-[#B88E2F] border border-[#B88E2F]/30",
              )}
              title={`Logado como ${user.name}`}
            >
              <FiUser size={16} />
              <span className="max-w-[70px] truncate">{user.name.split(" ")[0]}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-3 shadow-xl border border-[#E8E8E8] z-50 animate-fade-in">
                <p className="font-poppins text-xs font-semibold text-black truncate">
                  {user.name}
                </p>
                <p className="font-poppins text-[11px] text-[#9F9F9F] truncate mb-2">
                  {user.email}
                </p>
                <div className="border-t border-[#E8E8E8] my-1" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <FiLogOut size={14} />
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className={clsx(LinkHover, "flex items-center text-black")}
            title="Entrar na sua conta"
          >
            <FiUser size={21} />
          </Link>
        )}
      </div>

      {/* Ícone de Alerta */}
      <button type="button" className={clsx(LinkHover)} title="Notificações">
        <img
          src="/Icons/alert.svg"
          alt="Ícone de alerta"
          className="max-h-[18.66px]"
        />
      </button>

      {/* Ícone de Carrinho (Abre o Sidebar Drawer) */}
      <button
        type="button"
        onClick={toggleSidebar}
        className={clsx(LinkHover, "relative flex items-center cursor-pointer")}
        title="Abrir carrinho"
        aria-label="Abrir carrinho"
      >
        <img
          src="/Icons/shop.svg"
          alt="Ícone de carrinho"
          className="max-h-[22.05px]"
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
      </button>
    </div>
  );
};

export default RightMenu;
