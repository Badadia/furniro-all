import { getImage } from "../../lib/assets";

type ProductImagesProps = {
  images: string[];
};

const ProductImages = ({ images }: ProductImagesProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2">
        {images.map((image, index) => (
          <img
            key={image}
            src={getImage(image)}
            alt={`Product ${index + 1}`}
            className="mx-auto h-[348px] w-full max-w-[605px] rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
