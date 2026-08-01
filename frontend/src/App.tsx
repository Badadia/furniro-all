import { BrowserRouter, Routes, Route, Outlet } from "react-router"
import { Toaster } from "react-hot-toast"
import Container from "./components/Container"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"

function RootLayout() {
  return (
    <>
      <Toaster />
      <Container className="bg-[#FFF]">
        <Header />
      </Container>

      <Outlet />

      <Container>
        <Footer />
      </Container>
    </>
  )
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
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}