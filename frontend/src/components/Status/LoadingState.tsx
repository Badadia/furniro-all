import { LOADING_MESSAGE } from "../../constants/messages";

const LoadingState = () => {
  return (
    <main className="mx-auto flex max-w-[1240px] justify-center py-20">
      <p className="font-poppins text-lg text-primary-text-200">
        {LOADING_MESSAGE}
      </p>
    </main>
  );
};

export default LoadingState;
