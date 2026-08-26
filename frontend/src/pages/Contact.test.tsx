import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Contact } from "./Contact";

describe("Contact Page", () => {
  it("should render contact institutional information and form", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );

    expect(screen.getByText("Get In Touch With Us")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Working Time")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Abc")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Abc@def.com")).toBeInTheDocument();
  });

  it("should validate required fields on submit", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Por favor, informe seu nome")).toBeInTheDocument();
      expect(screen.getByText("Digite um e-mail válido")).toBeInTheDocument();
    });
  });

  it("should submit contact form successfully when valid", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Abc"), "Bryan Belo");
    await user.type(screen.getByPlaceholderText("Abc@def.com"), "bryan@example.com");
    await user.type(screen.getByPlaceholderText("This is an optional"), "Dúvida sobre produtos");
    await user.type(screen.getByPlaceholderText("Hi! I'd like to ask about"), "Gostaria de mais detalhes sobre o sofá.");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.queryByText("Por favor, informe seu nome")).not.toBeInTheDocument();
    });
  });
});
