import clsx from "clsx";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavMenu from "./NavMenu";
import RightMenu from "./RigthMenu";

const Header = () => {
  return (
    <header
      className={clsx(
        "flex justify-center items-center bg-white",
        "h-25 w-full",
        "sticky z-50 top-0",
        "bg-primary",
      )}
    >
      <div
        className={clsx(
          "flex justify-between items-center",
          "w-full max-w-[1280px] px-2",
          "md:px-4",
          "lg:px-12.5",
        )}
      >
        <Logo />
        <NavMenu className={clsx("hidden", "md:flex")} />
        <RightMenu className={clsx("hidden", "md:flex")} />
        <MobileMenu className={clsx("flex", "md:hidden")} />
      </div>
    </header>
  );
};
export default Header;
