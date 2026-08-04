import { Toaster } from "react-hot-toast";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Cart } from "./pages/Cart";
import Home from "./pages/Home";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          {/* <Route path="/shop/:category" element={<Shop />} /> */}
          {/* <Route path="/product/:slug" element={<ProductDetail />} /> */}
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
