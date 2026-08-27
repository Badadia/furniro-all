import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "../../stores/cart.store";
import { CartSidebar } from "./CartSidebar";

describe("CartSidebar", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({
      items: [
        {
          id: "1",
          sku: "SKU-001",
          name: "Asgaard sofa",
          price: 250000,
          discount: 0,
          image: "syltherine.png",
          quantity: 2,
        },
      ],
      isSidebarOpen: true,
    });
  });

  it("should render open cart sidebar with items and subtotal", () => {
    render(
      <MemoryRouter>
        <CartSidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("dialog", { name: "Shopping Cart" })).toBeInTheDocument();
    expect(screen.getByText("Asgaard sofa")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cart" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checkout" })).toBeInTheDocument();
  });

  it("should remove item when clicking delete button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CartSidebar />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Remove Asgaard sofa from cart" }));

    expect(useCartStore.getState().items.length).toBe(0);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("should close sidebar when clicking close button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CartSidebar />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Close cart" }));

    expect(useCartStore.getState().isSidebarOpen).toBe(false);
  });
});
