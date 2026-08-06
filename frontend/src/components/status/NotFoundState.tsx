import { PRODUCT_NOT_FOUND_MESSAGE } from "../../constants/messages";

const NotFoundState = () => {
  return (
    <main className="mx-auto flex max-w-[1240px] justify-center py-20">
      <p className="font-poppins text-lg text-primary-text-200">
        {PRODUCT_NOT_FOUND_MESSAGE}
      </p>
    </main>
  );
};

export default NotFoundState;
