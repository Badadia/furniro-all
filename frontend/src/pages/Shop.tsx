import { useState } from "react";
import Benefits from "../components/Benefits/Benefits";
import Pagination from "../components/Pagination/Pagination";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import PageBanner from "../components/Shop/PageBanner";
import ShopToolBar from "../components/ShopToolBar/ShopToolBar";
import { useProducts } from "../hooks/UseProducts";

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [limit, setLimit] = useState(16);
  const [offset, setOffset] = useState(0);

  const { products, loading, total } = useProducts({
    category,
    sort,
    limit,
    offset,
  });

  const resultText = `Showing ${products.length} results`;

  return (
    <div>
      <PageBanner title="Shop" breadcrumbHome="Home" breadcrumbCurrent="Shop" />

      <ShopToolBar
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        limit={limit}
        onLimitChange={setLimit}
        resultText={resultText}
      />

      <div className="mt-20">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      <div className="mb-22">
        <Pagination
          limit={limit}
          total={total}
          offset={offset}
          onPageChange={setOffset}
        />
      </div>

      <Benefits />
    </div>
  );
};

export default Shop;
