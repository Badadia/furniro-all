import { Toaster } from "react-hot-toast";
import { BrowserRouter, Outlet, Route, Routes, useParams } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Cart } from "./pages/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SingleProductPage from "./pages/SingleProductPage";

function RootLayout() {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function SingleProductRoute() {
  const { id, slug } = useParams();
  return <SingleProductPage key={slug ?? id} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProductRoute />} />
          <Route path="/product/slug/:slug" element={<SingleProductRoute />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
