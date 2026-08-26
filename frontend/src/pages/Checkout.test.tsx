import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthStore } from "../stores/auth.store";
import { useCartStore } from "../stores/cart.store";
import { Checkout } from "./Checkout";

const mockFetchAddressByCep = vi.fn();

vi.mock("../services/viacep.service", () => ({
  fetchAddressByCep: (cep: string) => mockFetchAddressByCep(cep),
}));

describe("Checkout Page", () => {
  beforeEach(() => {
    localStorage.clear();
    mockFetchAddressByCep.mockReset();
    useAuthStore.setState({
      user: { id: "1", name: "Bryan Belo", email: "bryan@example.com" },
      token: "jwt-test-token",
      isAuthenticated: true,
    });
    useCartStore.setState({
      items: [
        {
          id: "1",
          sku: "SKU-001",
          name: "Asgaard sofa",
          price: 250000,
          discount: 0,
          image: "syltherine.png",
          quantity: 1,
        },
      ],
    });
  });

  it("should render billing details form and order summary", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Billing details" })).toBeInTheDocument();
    expect(screen.getByText("Asgaard sofa")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place order" })).toBeInTheDocument();
  });

  it("should auto-fill address fields when valid ZIP code is provided", async () => {
    const user = userEvent.setup();
    mockFetchAddressByCep.mockResolvedValueOnce({
      cep: "01001-000",
      logradouro: "Praça da Sé",
      complemento: "lado ímpar",
      bairro: "Sé",
      localidade: "São Paulo",
      uf: "SP",
    });

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    );

    const zipInput = screen.getByPlaceholderText("00000-000");
    await user.type(zipInput, "01001000");
    await user.tab(); // triggers blur

    await waitFor(() => {
      expect(mockFetchAddressByCep).toHaveBeenCalledWith("01001000");
    });
  });
});
