import clsx from "clsx";
import { Link } from "react-router";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/">
      <div className={clsx("flex gap-1.25 items-center", className)}>
        <img
          src="/Logo/Logo.svg"
          alt="Logo furniro"
          className={clsx("w-12.5 h-8")}
        />
        <h1 className={clsx("font-montserrat font-bold text-[34px]")}>
          Furniro
        </h1>
      </div>
    </Link>
  );
};
export default Logo;
