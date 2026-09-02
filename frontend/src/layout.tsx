import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { CartSidebar } from "./components/CartSidebar/CartSidebar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Toaster />
      <Header />
      <CartSidebar />
      <div className="flex-1 w-full overflow-x-clip">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
