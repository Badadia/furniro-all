import RoomCarousel from "../components/Carousel/RoomCarousel";
import CategoriesGrid from "../components/Categories/CategoriesGrid";
import Container from "../components/Container";
import Hero from "../components/Hero/Hero";
import Mosaic from "../components/Mosaic/Mosaic";
import ProductGrid from "../components/ProductGrid/ProductGrid";

const Home = () => {
  return (
    <div>
      <Hero />
      <Container>
        <CategoriesGrid />
      </Container>
      <Container>
        <ProductGrid></ProductGrid>
      </Container>
      <Container>
        <RoomCarousel></RoomCarousel>
      </Container>
      <Container>
        <Mosaic></Mosaic>
      </Container>
    </div>
  );
};
export default Home;
