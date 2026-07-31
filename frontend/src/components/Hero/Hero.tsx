import HeroButton from "./HeroButton";

const Hero = () => {
  return (
    <div
      className="
        flex items-baseline justify-center
        bg-[url('/Images/Hero.jpg')] bg-cover bg-center bg-no-repeat
        px-4 py-20 font-poppins
        md:h-[716.83px] md:justify-end md:pt-38.25 md:pr-14.5 md:pl-0
      ">
      <div
        className="
          flex w-full max-w-160.75 flex-col rounded-[10px]
          bg-secundary
          pt-15.5 pr-14 pb-9.25 pl-10.25
        "
      >
        <h2 className="mb-1 text-[16px] font-semibold tracking-[3px] text-primary-text">
          New Arrival
        </h2>

        <h1
          className="
            mb-4.25 text-[32px] font-bold leading-12 text-over-secundary
            sm:text-[42px] sm:leading-14
            md:text-[52px] md:leading-16.25
            max-xxs:text-[22px] max-xxs:leading-8
          "
        >
          Discovery Our <br />
          New Collection
        </h1>

        <p
          className="
            mb-11.5 font-medium leading-8 text-primary-text
            md:text-[18px]
            max-xxs:mb-8 max-xxs:text-[14px] max-xxs:leading-7
          "
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>

        <HeroButton label="Buy Now" />
      </div>
    </div>
  );
};

export default Hero;