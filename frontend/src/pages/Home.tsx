import { useProducts } from "@/hooks/useProducts";
import RoomCarousel from "../components/Carousel/RoomCarousel";
import CategoriesGrid from "../components/Categories/CategoriesGrid";
import Container from "../components/Container";
import Hero from "../components/Hero/Hero";
import Mosaic from "../components/Mosaic/Mosaic";
import ProductGrid from "../components/ProductGrid/ProductGrid";

export const Home = () => {
  const { products } = useProducts({});

  return (
    <div>
      <Hero />
      <Container>
        <CategoriesGrid />
        <ProductGrid products={products} title="Our Products" />
        <RoomCarousel />
        <Mosaic />
      </Container>
    </div>
  );
};
