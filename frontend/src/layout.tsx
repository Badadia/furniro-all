import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { CartSidebar } from "./components/CartSidebar/CartSidebar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
      <Toaster />
      <Header />
      <CartSidebar />
      <div className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
