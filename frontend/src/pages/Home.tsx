import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";
import { useProducts } from "@/hooks/useProducts";
import RoomCarousel from "../components/Carousel/RoomCarousel";
import CategoriesGrid from "../components/Categories/CategoriesGrid";
import Container from "../components/Container";
import Hero from "../components/Hero/Hero";
import Mosaic from "../components/Mosaic/Mosaic";
import ProductGrid from "../components/ProductGrid/ProductGrid";

export const Home = () => {
  const { products, loading } = useProducts({});

  return (
    <div>
      <Hero />
      <Container>
        <CategoriesGrid />
        {loading ? (
          <ProductGridSkeleton count={8} title="Our Products" />
        ) : (
          <ProductGrid products={products} title="Our Products" />
        )}
        <RoomCarousel />
        <Mosaic />
      </Container>
    </div>
  );
};
