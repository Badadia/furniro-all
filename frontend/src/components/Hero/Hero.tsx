import clsx from "clsx";
import { Link } from "react-router";
import { getImage } from "../../lib/assets";
import HeroButton from "./HeroButton";

const Hero = () => {
  return (
    <section className="relative mx-auto mb-64 sm:mb-20 lg:mb-0">
      <img
        className="max-h-60 w-screen object-cover sm:max-h-70 md:max-h-100 lg:max-h-150 xl:max-h-179"
        src={getImage("Hero.jpg")}
        alt="Imagem de interior de sala"
      />
      <div
        className={clsx(
          "absolute inset-x-0 mx-auto -mt-14 flex max-w-2xs flex-col rounded-[10px] bg-secundary p-6 pt-7",
          "sm:-mt-40 sm:max-w-lg",
          "md:-mt-50 md:max-w-160.75",
          "lg:right-10 lg:bottom-12 lg:left-auto lg:mx-0 lg:mt-0 lg:p-7 lg:pt-10",
          "xl:right-15.75 xl:bottom-29.25 xl:p-9.25 xl:pt-14",
        )}
      >
        <span className="mb-1 text-sm font-semibold tracking-[3px] text-primary-text xl:text-base">
          New Arrival
        </span>
        <h1
          className={clsx(
            "mb-2 text-2xl leading-8 font-bold text-over-secundary",
            "xl:mb-4.25 xl:text-[52px] xl:leading-16.25",
          )}
        >
          Discover Our <br /> New Collection
        </h1>
        <span
          className={clsx(
            "mb-6 leading-6 font-medium text-primary-text",
            "xl:mb-11.5 xl:text-lg",
          )}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </span>

        <Link to="/shop">
          <HeroButton label="BUY NOW" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
