import { useState } from "react";
import type { ProductDetailsProps } from "./types";
import ProductTabs from "./ProductTabs";
import ProductContent from "./ProductContent";
import ProductImages from "./ProductImages";

const ProductDetails = ({ tabs, images }: ProductDetailsProps) => {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  if (tabs.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <ProductTabs tabs={tabs} activeId={activeId} onSelect={setActiveId} />

      <div className="mt-10 border-t border-[#D9D9D9]">
        <ProductContent tabs={tabs} activeId={activeId} />
      </div>

      <ProductImages images={images} />
    </section>
  );
};

export default ProductDetails;
