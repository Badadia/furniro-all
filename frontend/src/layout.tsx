import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export function RootLayout() {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
