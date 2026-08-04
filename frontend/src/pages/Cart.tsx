import Benefits from "../components/Benefits/Benefits";
import { CartHeaders } from "../components/Cart/CartHeaders";
import { CartList } from "../components/Cart/CartList";
import { CartTotals } from "../components/Cart/CartTotals";

export const Cart = () => {
  return (
    <div className="mb-2">
      <div>
        <h1>Cart (usar componente)</h1>
        <span>{"Home > Cart"}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-7 px-4 max-w-310 mx-auto mb-21.25">
        <div className="col-span-2 overflow-x-auto md:overflow-x-visible">
          <CartHeaders />
          <CartList />
        </div>
        <CartTotals />
      </div>

      <Benefits />
    </div>
  );
};
