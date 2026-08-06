import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Benefits from "../components/Benefits/Benefits";
import Pagination from "../components/Pagination/Pagination";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import PageBanner from "../components/Shop/PageBanner";
import ShopToolBar from "../components/ShopToolBar/ShopToolBar";

export const Shop = () => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  const category = categoryParam || "all";

  const [sort, setSort] = useState("default");
  const [limit, setLimit] = useState(16);
  const [offset, setOffset] = useState(0);

  const handleCategoryChange = (newCategory: string) => {
    navigate(newCategory === "all" ? "/shop" : `/shop/${newCategory}`);
    setOffset(0);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setOffset(0);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0);
  };

  const { products, loading, total } = useProducts({
    category,
    sort,
    limit,
    offset,
  });

  const effectiveOffset = !loading && total > 0 && offset >= total ? 0 : offset;

  const resultText = loading
    ? "Loading products..."
    : `Showing ${total} results`;

  return (
    <div>
      <PageBanner title="Shop" breadcrumbHome="Home" breadcrumbCurrent="Shop" />

      <ShopToolBar
        disabled={loading}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
        limit={limit}
        onLimitChange={handleLimitChange}
        resultText={resultText}
      />

      <div className="mt-20">
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {!loading && (
        <div className="mb-22">
          <Pagination
            limit={limit}
            total={total}
            offset={effectiveOffset}
            onPageChange={setOffset}
          />
        </div>
      )}

      <Benefits />
    </div>
  );
};
