import clsx from "clsx";

type BreadcrumbProps = {
  category: string;
  productName: string;
  className?: string;
};

const Breadcrumb = ({
  category,
  productName,
  className,
}: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        "flex h-[100px] w-full items-center px-4 sm:px-8 lg:px-[100px]",
        className,
      )}
      style={{ backgroundColor: "#F9F1E7" }}
    >
      <ol className="flex flex-wrap items-center gap-6 text-base">
        <li className="text-primary-text-100">Home</li>

        <li className="font-bold text-primary-text-200/40">&gt;</li>

        <li className="text-primary-text-100">{category}</li>

        <li className="font-bold text-primary-text-200/40">&gt;</li>

        <li className="h-[37px] w-px bg-primary-text-100/40" />

        <li className="text-primary-text-200">{productName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;