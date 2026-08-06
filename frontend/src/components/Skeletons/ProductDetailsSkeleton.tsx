type ProductDetailsSkeletonProps = {
  tabCount?: number;
  imageCount?: number;
};

export const ProductDetailsSkeleton = ({
  tabCount = 2,
  imageCount = 2,
}: ProductDetailsSkeletonProps) => {
  return (
    <section className="w-full animate-pulse border-t border-gray-400">
      {/* ProductTabs */}
      <div className="flex flex-wrap justify-center gap-6 pt-12.25 sm:gap-16">
        {Array.from({ length: tabCount }).map((_, index) => (
          <div key={index} className="h-7 w-24 rounded bg-gray-300" />
        ))}
      </div>

      {/* ProductContent */}
      <div className="mt-10">
        <div className="mx-auto max-w-256.5 space-y-3 pt-8">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>

      {/* ProductImages */}
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2">
          {Array.from({ length: imageCount }).map((_, index) => (
            <div
              key={index}
              className="mx-auto h-87 w-full max-w-151.25 rounded-lg bg-gray-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
