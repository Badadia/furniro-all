import { ERROR_MESSAGE, TRY_AGAIN } from "../../constants/messages";

type ErrorStateProps = {
  onRetry: () => void;
};

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <main className="mx-auto flex max-w-[1240px] flex-col items-center justify-center gap-6 py-20">
      <p className="font-poppins text-lg text-primary-text-200">
        {ERROR_MESSAGE}
      </p>
      <button
        onClick={onRetry}
        className="rounded-lg border border-black px-8 py-3 font-poppins text-sm font-medium hover:bg-primary-text-200 hover:text-white"
      >
        {TRY_AGAIN}
      </button>
    </main>
  );
};

export default ErrorState;
