import { SingleProductSkeleton } from "@/components/Skeletons/SingleProductSkeleton";
import { useParams } from "react-router";
import { buildProductTabs } from "../builders/buildProductTabs";
import Breadcrumb from "../components/BreadCrumb/BreadCrumb";
import ProductDetails from "../components/ProductDetails";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import RelatedProducts from "../components/RelatedProducts";
import ErrorState from "../components/Status/ErrorState";
import NotFoundState from "../components/Status/NotFoundState";
import { useProduct } from "../hooks/useProduct";

export const SingleProduct = () => {
  const { id, slug } = useParams();
  const mode = slug ? "slug" : "id";
  const identifier = slug ?? id ?? "";
  const { product, status, retry } = useProduct(identifier, mode);

  if (status === "loading") {
    return <SingleProductSkeleton />;
  }

  if (status === "notfound") {
    return <NotFoundState />;
  }

  if (status === "error") {
    return <ErrorState onRetry={retry} />;
  }

  const p = product!;

  return (
    <>
      <Breadcrumb category={p.category} productName={p.name} />

      <main className="mx-auto flex max-w-310 flex-col gap-10 px-4 py-10 sm:px-0 lg:gap-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
          <ProductGallery
            key={p.id}
            images={[p.image, ...p.additionalImages]}
          />

          <ProductInfo product={p} />
        </div>

        <ProductDetails
          tabs={buildProductTabs(p)}
          images={p.additionalImages}
        />

        <RelatedProducts product={p} />
      </main>
    </>
  );
};
