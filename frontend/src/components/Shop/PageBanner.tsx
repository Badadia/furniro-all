import clsx from "clsx";
import BannerImage from "../../../public/Shop/shop-banner.png";

type PageBannerProps = {
  topImage?: string;
  logo?: string;
  title: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  className?: string;
};

const PageBanner = ({
  title,
  className,
  topImage,
  logo,
  breadcrumbHome,
  breadcrumbCurrent,
}: PageBannerProps) => {
  return (
    <div className={clsx("relative", className)}>
      <img
        src={topImage || BannerImage}
        alt=""
        className="h-[116px] w-full object-cover sm:h-[216px] md:h-[316px]"
      />

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-0 sm:bottom-16 md:bottom-32">
        {logo && (
  <div className="relative h-[77px] w-[77px]">
    <img
      src={logo}
      alt=""
      className="absolute bottom-0 left-1/2 max-h-[43px] max-w-[43px] -translate-x-1/2 object-contain"
    />
  </div>
)}

        <h1 className="font-poppins text-[32px] font-semibold text-primary-text-200 sm:text-[36px] md:text-[42px]">
          {title}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-primary-text-200/70 sm:text-base">
          <span className="font-bold">{breadcrumbHome}</span>
          <span className="font-bold text-primary-text-200/40">&gt;</span>
          <span className="font-medium text-primary-text-200">
            {breadcrumbCurrent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;