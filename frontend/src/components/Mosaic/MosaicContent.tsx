import clsx from "clsx";
import { getImage } from "../../lib/assets";

const MoscaiContent = () => {
  return (
    <div className={clsx("w-360 h-180.25", "relative")}>
      <div className={clsx("overflow-hidden absolute top-0 left-0")}>
        <img
          src={getImage("Mosaic1.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-17.5 left-23.5")}>
        <img
          src={getImage("Mosaic2.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-99.5 left-0")}>
        <img
          src={getImage("Mosaic3.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-99.5 left-50.25")}>
        <img
          src={getImage("Mosaic4.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-39 left-140.25")}>
        <img
          src={getImage("Mosaic5.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-24.75 left-218")}>
        <img
          src={getImage("Mosaic6.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-115.75 left-218")}>
        <img
          src={getImage("Mosaic7.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-3.5 left-294.5")}>
        <img
          src={getImage("Mosaic8.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>

      <div className={clsx("overflow-hidden absolute top-115.75 left-266.5")}>
        <img
          src={getImage("Mosaic9.png")}
          alt=""
          className={clsx("hover:scale-110 transition")}
        />
      </div>
    </div>
  );
};

export default MoscaiContent;
