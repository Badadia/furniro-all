import type { Product } from "@/types/product";
import { calculateDiscount, formatPrice } from "@/utils/price";
import { useProductVariant } from "../../hooks/useProductVariant";
import AddToCartButton from "./AddToCartButton";
import ProductColors from "./ProductColors";
import ProductMeta from "./ProductMeta";
import ProductPrice from "./ProductPrice";
import ProductSizes from "./ProductSizes";
import { QuantitySelector } from "./QuantitySelector";

type ProductInfoProps = {
  product: Product;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const {
    selectedSize,
    selectedColor,
    quantity,
    setSelectedSize,
    setSelectedColor,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
  } = useProductVariant(product);

  const unitPrice = calculateDiscount(product.price, product.discount);

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="font-poppins text-[42px] font-medium text-primary-text-200">
        {product.name}
      </h1>

      <ProductPrice
        currentPrice={formatPrice(unitPrice)}
        oldPrice={product.discount > 0 ? formatPrice(product.price) : undefined}
      />

      <div className="mt-4 flex items-center gap-4">
        <div className="flex text-yellow-500">★ ★ ★ ★ ★</div>

        <span className="h-5 w-px bg-gray-300" />

        <span className="text-sm text-gray-500">5 Customer Review</span>
      </div>

      <p className="mt-6 text-sm leading-6 text-primary-text-200">
        {product.description}
      </p>

      <ProductSizes
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      <ProductColors
        colors={product.colors}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />

      <div className="mt-8 flex flex-wrap gap-4">
        <QuantitySelector
          value={quantity}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
        />

        <AddToCartButton onClick={addToCart} />
      </div>

      <ProductMeta sku={product.sku} category={product.category} />
    </div>
  );
};

export default ProductInfo;
