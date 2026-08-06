type ProductGallerySkeletonProps = {
  thumbnailCount?: number;
};

export const ProductGallerySkeleton = ({
  thumbnailCount = 4,
}: ProductGallerySkeletonProps) => {
  return (
    <div className="flex w-full animate-pulse flex-col-reverse items-center gap-6 sm:w-auto sm:flex-row sm:items-start sm:gap-8">
      <div className="flex flex-row flex-wrap justify-center gap-4 sm:flex-col sm:flex-nowrap sm:justify-start sm:gap-8">
        {Array.from({ length: thumbnailCount }).map((_, index) => (
          <div key={index} className="h-20 w-20 rounded-lg bg-gray-300" />
        ))}
      </div>

      <div className="aspect-square w-full max-w-125 rounded-lg bg-gray-300 sm:aspect-auto sm:h-125 sm:w-125" />
    </div>
  );
};
