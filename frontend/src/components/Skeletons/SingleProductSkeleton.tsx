import { BreadcrumbSkeleton } from "./BreadcrumbSkeleton";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";
import { ProductGallerySkeleton } from "./ProductGallerySkeleton";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ProductInfoSkeleton } from "./ProductInfoSkeleton";

export function SingleProductSkeleton() {
  return (
    <>
      <BreadcrumbSkeleton />
      <main className="mx-auto flex max-w-310 flex-col gap-10 px-4 py-10 sm:px-0 lg:gap-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
          <ProductGallerySkeleton />

          <ProductInfoSkeleton />
        </div>

        <ProductDetailsSkeleton />
        <ProductGridSkeleton count={4} />
      </main>
    </>
  );
}
