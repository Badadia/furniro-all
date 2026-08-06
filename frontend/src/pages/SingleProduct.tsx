import { useParams } from "react-router"
import { buildProductTabs } from "../builders/buildProductTabs"
import Breadcrumb from "../components/BreadCrumb/BreadCrumb"
import ProductDetails from "../components/ProductDetails"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import RelatedProducts from "../components/RelatedProducts"
import ErrorState from "../components/Status/ErrorState"
import LoadingState from "../components/Status/LoadingState"
import NotFoundState from "../components/Status/NotFoundState"
import { useProduct } from "../hooks/useProduct"

export const SingleProduct = () => {
  const { id, slug } = useParams()
  const mode = slug ? "slug" : "id"
  const identifier = slug ?? id ?? ""
  const { product, status, retry } = useProduct(identifier, mode)

  if (status === "loading") {
    return <LoadingState />
  }

  if (status === "notfound") {
    return <NotFoundState />
  }

  if (status === "error" || !product) {
    return <ErrorState onRetry={retry} />
  }

  return (
    <>
      <Breadcrumb category={product.category} productName={product.name} />

      <main className="mx-auto flex max-w-310 flex-col gap-10 px-4 py-10 sm:px-0 lg:gap-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
          <ProductGallery
            key={product.id}
            images={[product.image, ...product.additionalImages]}
          />

          <ProductInfo product={product} />
        </div>

        <ProductDetails
          tabs={buildProductTabs(product)}
          images={product.additionalImages}
        />

        <RelatedProducts product={product} />
      </main>
    </>
  )
}
