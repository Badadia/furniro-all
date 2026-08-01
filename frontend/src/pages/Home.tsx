import RoomInspiration from "../components/Carousel/RoomInspiration";
import Categories from "../components/Categories/Categories";
import Container from "../components/Container";
import Hero from "../components/Hero/Hero";
import Mosaic from "../components/Mosaic/Mosaic";
import ProductGrid from "../components/ProductGrid/ProductGrid";

const Home = () => {
  return (
    <div>
      <Container>
        <Hero></Hero>
      </Container>
      <Container>
        <Categories></Categories>
      </Container>
      <Container>
        <ProductGrid></ProductGrid>
      </Container>
      <Container>
        <RoomInspiration></RoomInspiration>
      </Container>
      <Container>
        <Mosaic></Mosaic>
      </Container>
    </div>
  );
};
export default Home;