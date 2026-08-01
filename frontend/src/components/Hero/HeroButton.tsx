import clsx from "clsx";

const HeroButton = () => {
  return (
    <button
      className={clsx(
        "mx-auto w-fit cursor-pointer bg-over-secundary px-16 py-4 text-sm font-bold text-white transition hover:scale-105",
        "lg:mx-0 xl:px-18",
        "xl:py-6.25 xl:text-base",
      )}
    >
      BUY NOW
    </button>
  );
};

export default HeroButton;
