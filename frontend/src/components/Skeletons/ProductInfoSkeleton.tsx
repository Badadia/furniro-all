export const ProductInfoSkeleton = () => {
  return (
    <div className="w-full max-w-100 animate-pulse">
      <div className="h-10 w-3/4 rounded bg-gray-300" />

      <div className="mt-4 flex items-center gap-4">
        <div className="h-6 w-20 rounded bg-gray-300" />
        <div className="h-6 w-16 rounded bg-gray-200" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="h-4 w-24 rounded bg-gray-200" />

        <span className="h-5 w-px bg-gray-300" />

        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>

      <div className="mt-6 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>

      <div className="mt-6">
        <div className="h-4 w-16 rounded bg-gray-300" />
        <div className="mt-3 flex gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="h-10 w-10 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="mt-6">
        <div className="h-4 w-16 rounded bg-gray-300" />
        <div className="mt-3 flex gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300" />
          <div className="h-8 w-8 rounded-full bg-gray-300" />
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <div className="h-12 w-32 rounded border border-gray-300" />
        <div className="h-12 w-40 rounded bg-gray-300" />
      </div>

      <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
        <div className="h-3 w-40 rounded bg-gray-200" />
        <div className="h-3 w-48 rounded bg-gray-200" />
      </div>
    </div>
  );
};
