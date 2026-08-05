type ProductMetaProps = {
  sku: string;
  category: string;
};

const ProductMeta = ({ sku, category }: ProductMetaProps) => {
  return (
    <div className="mt-10 border-t pt-6 text-sm text-gray-500">
      <p>
        SKU: {sku}
      </p>

      <p>
        Category: {category}
      </p>

      <p>
        Tags: {category}
      </p>
    </div>
  );
};

export default ProductMeta;
