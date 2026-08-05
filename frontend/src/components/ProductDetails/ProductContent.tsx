import type { ProductDetailsTab } from "./types";

type ProductContentProps = {
  tabs: ProductDetailsTab[];
  activeId: string;
};

const ProductContent = ({ tabs, activeId }: ProductContentProps) => {
  const activeTab = tabs.find((tab) => tab.id === activeId);

  if (!activeTab) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`product-panel-${activeTab.id}`}
      aria-labelledby={`product-tab-${activeTab.id}`}
      className="mx-auto max-w-[1026px] pt-8 text-justify leading-7 text-[#9F9F9F]"
    >
      {activeTab.content}
    </div>
  );
};

export default ProductContent;
