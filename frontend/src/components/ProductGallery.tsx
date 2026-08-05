import { useGallery } from "../features/single-product/hooks/useGallery";
import { getImage } from "../lib/assets";

type ProductGalleryProps = {
  images: string[];
};

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const { selectedImage, setSelectedImage } = useGallery(images);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col-reverse items-center gap-6 sm:w-auto sm:flex-row sm:items-start sm:gap-8">
      {/* Miniaturas */}
      <div className="flex flex-row flex-wrap justify-center gap-4 sm:flex-col sm:flex-nowrap sm:justify-start sm:gap-8">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`flex h-[80px] w-[80px] items-center justify-center rounded-lg bg-[#F9F1E7] ${
              selectedImage === image
                ? "ring-2 ring-primary-text-200"
                : ""
            }`}
          >
            <img
              src={getImage(image)}
              alt={`Product ${index + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagem principal */}
      <div className="flex aspect-square w-full max-w-[500px] items-center justify-center rounded-lg bg-[#F9F1E7] sm:aspect-auto sm:h-[500px] sm:w-[500px]">
        <img
          src={getImage(selectedImage)}
          alt="Product"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
