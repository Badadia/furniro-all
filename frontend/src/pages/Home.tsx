import RoomCarousel from "../components/Carousel/RoomCarousel";
import CategoriesGrid from "../components/Categories/CategoriesGrid";
import Container from "../components/Container";
import Hero from "../components/Hero/Hero";
import Mosaic from "../components/Mosaic/Mosaic";
import ProductGrid from "../components/ProductGrid/ProductGrid";

const Home = () => {
  // TODO: pegar os produtos da API e passar para o ProductGrid

  return (
    <div>
      <Hero />
      <Container>
        <CategoriesGrid />
        <ProductGrid products={[]} />
        <RoomCarousel />
        <Mosaic />
      </Container>
    </div>
  );
};
export default Home;
