import RoomCarousel from "../components/Carousel/RoomCarousel";
import Categories from "../components/Categories/Categories";
import Container from "../components/Container";
import Hero from "../components/Hero/Hero";
import Mosaic from "../components/Mosaic/Mosaic";
import ProductGrid from "../components/ProductGrid/ProductGrid";

const Home = () => {
  return (
    <div>
      <Hero />
      <Container>
        <Categories></Categories>
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
