import { twMerge } from "tailwind-merge";

type HeroButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

const HeroButton = ({ label, className, onClick }: HeroButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "h-18.5 w-55.5 bg-over-secundary font-poppins text-[16px] font-bold uppercase text-primary",
        "cursor-pointer transition hover:bg-over-secundary/90",
        "max-xxs:h-14 max-xxs:w-40",
        className,
      )}
    >
      {label}
    </button>
  );
};

export default HeroButton;
