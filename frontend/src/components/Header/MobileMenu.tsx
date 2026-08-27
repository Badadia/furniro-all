import { useState } from "react";
import clsx from "clsx";
import { LuMenu, LuX } from "react-icons/lu";
import NavMenu from "./NavMenu";
import RightMenu from "./RigthMenu";

type MobileMenuProps = {
  className?: string;
};

const MobileMenu = ({ className }: MobileMenuProps) => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setAtivo(!ativo)}
        className="p-1 text-black cursor-pointer hover:scale-105 transition-all"
        aria-label={ativo ? "Fechar menu" : "Abrir menu"}
      >
        {ativo ? <LuX size={28} /> : <LuMenu size={28} />}
      </button>

      {ativo && (
        <div
          className="fixed inset-0 top-25 bg-black/20 z-40 backdrop-blur-[1px]"
          onClick={() => setAtivo(false)}
        />
      )}

      <div
        className={clsx(
          "absolute top-16 right-0 z-50",
          "w-64 max-w-[85vw] rounded-2xl bg-white p-6 shadow-2xl border border-[#E8E8E8]",
          "transition-all duration-300",
          {
            "opacity-100 scale-100 pointer-events-auto": ativo,
            "opacity-0 scale-95 pointer-events-none hidden": !ativo,
          },
        )}
      >
        <NavMenu
          className="flex-col justify-center items-center gap-6 text-center"
          children={<RightMenu className="mt-4 justify-center" />}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
