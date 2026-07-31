import clsx from "clsx";

type NavMenuProps = {
  className?: string;
  children?: React.ReactNode;
};
const NavMenu = ({ className, children }: NavMenuProps) => {
  const LinkHover: string = "hover:cursor-pointer hover:scale-105 transition";
  return (
    <nav
      className={clsx(
        "w-107.5",
        "flex justify-around",
        "font-poppins text-[16px] text-over-primary",
        "lg:justify-between",
        className,
      )}
    >
      <a className={clsx(LinkHover)}>Home</a>
      <a className={clsx(LinkHover)}>Shop</a>
      <a className={clsx(LinkHover)}>About</a>
      <a className={clsx(LinkHover)}>Contact</a>
      {children}
    </nav>
  );
};
export default NavMenu;
