import clsx from "clsx";
import { Link } from "react-router";

type BreadcrumbProps = {
  category: string;
  productName: string;
  className?: string;
};

const Breadcrumb = ({ category, productName, className }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        "flex h-[100px] w-full items-center px-4 sm:px-8 lg:px-[100px] font-poppins",
        className,
      )}
      style={{ backgroundColor: "#F9F1E7" }}
    >
      <ol className="flex flex-wrap items-center gap-6 text-base font-medium">
        <Link
          to="/"
          className={"text-[#9F9F9F] font-medium hover:text-black transition"}
        >
          Home
        </Link>

        <li className="font-bold text-primary-black">
          <img src={`/Icons/breadcrumbarrow.svg`} alt="Arrow Pointing Right" />
        </li>

        <Link
          to={`/shop/${category.toLowerCase()}`}
          className={"text-[#9F9F9F] hover:text-black transition"}
        >
          {category}
        </Link>

        <li className="font-bold text-primary-black">
          <img src={`/Icons/breadcrumbarrow.svg`} alt="Arrow Pointing Right" />
        </li>

        <li className="h-[37px] w-[2px] bg-primary-text-100/40" />

        <li className="text-primary-text-200">{productName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
