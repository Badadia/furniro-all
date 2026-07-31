import clsx from "clsx";

type ProductGridButtonProps = {
  onClick: () => void;
  label: string;
  disabled: boolean;
};

const ProductGridButton = ({
  onClick,
  label,
  disabled,
}: ProductGridButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "h-12 w-61.25 border border-over-secundary font-poppins text-[16px] font-semibold leading-6 text-over-secundary",
        !disabled &&
          "cursor-pointer transition hover:bg-over-secundary hover:text-secundary",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {label}
    </button>
  );
};

export default ProductGridButton;