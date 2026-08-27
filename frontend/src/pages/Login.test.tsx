import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthStore } from "@/stores/auth.store";
import { Login } from "./Login";

const mockLoginUser = vi.fn();
const mockRegisterUser = vi.fn();

vi.mock("../services/auth.service", () => ({
  loginUser: (data: unknown) => mockLoginUser(data),
  registerUser: (data: unknown) => mockRegisterUser(data),
}));

describe("Login Page", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
    mockLoginUser.mockReset();
    mockRegisterUser.mockReset();
  });

  it("should render sign in form by default", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
  });

  it("should switch between Sign In and Create Account tabs", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  it("should submit login form successfully", async () => {
    const user = userEvent.setup();
    mockLoginUser.mockResolvedValueOnce({
      user: { id: "1", name: "Bryan Belo", email: "bryan@example.com" },
      token: "jwt-test-token",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Enter your email"), "bryan@example.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "password123");
    
    // Clica no botão de submit do formulário
    const submitButtons = screen.getAllByRole("button", { name: "Sign In" });
    const submitBtn = submitButtons.find((btn) => btn.getAttribute("type") === "submit") || submitButtons[0];
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: "bryan@example.com",
        password: "password123",
      });
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.name).toBe("Bryan Belo");
    });
  });
});
