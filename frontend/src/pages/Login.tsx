import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "../utils/zodResolver";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";
import Benefits from "../components/Benefits/Benefits";
import PageBanner from "../components/Shop/PageBanner";
import { loginUser, registerUser } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = (location.state as { from?: string })?.from || "/";

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isSubmitting: isSubmittingLogin },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors, isSubmitting: isSubmittingRegister },
    reset: resetRegister,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      const res = await loginUser(data);
      setAuth(res.user, res.token);
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to sign in. Please check your credentials.";
      setServerError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setAuth(res.user, res.token);
      toast.success(`Account created successfully! Welcome, ${res.user.name}!`);
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to create account. Please try again.";
      setServerError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const toggleMode = (registerMode: boolean) => {
    setIsRegistering(registerMode);
    setServerError(null);
    resetLogin();
    resetRegister();
  };

  return (
    <main className="min-h-screen bg-white">
      <PageBanner
        title={isRegistering ? "Register" : "Login"}
        breadcrumbHome="Home"
        breadcrumbCurrent={isRegistering ? "Register" : "Login"}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-[#E8E8E8] bg-[#FAF3EA]/30 p-8 shadow-sm">
          <div className="mb-8 flex border-b border-[#E8E8E8]">
            <button
              type="button"
              onClick={() => toggleMode(false)}
              className={`flex-1 pb-4 text-center font-poppins text-lg font-semibold transition-colors cursor-pointer ${
                !isRegistering
                  ? "border-b-2 border-[#B88E2F] text-[#B88E2F]"
                  : "text-[#9F9F9F] hover:text-black"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => toggleMode(true)}
              className={`flex-1 pb-4 text-center font-poppins text-lg font-semibold transition-colors cursor-pointer ${
                isRegistering
                  ? "border-b-2 border-[#B88E2F] text-[#B88E2F]"
                  : "text-[#9F9F9F] hover:text-black"
              }`}
            >
              Create Account
            </button>
          </div>

          {serverError && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
              {serverError}
            </div>
          )}

          {!isRegistering ? (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-6">
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...registerLogin("email")}
                  className={`w-full rounded-[10px] border bg-white px-4 py-3.5 font-poppins text-sm text-black outline-none transition ${
                    loginErrors.email ? "border-red-500" : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {loginErrors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">{loginErrors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...registerLogin("password")}
                  className={`w-full rounded-[10px] border bg-white px-4 py-3.5 font-poppins text-sm text-black outline-none transition ${
                    loginErrors.password ? "border-red-500" : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {loginErrors.password && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">{loginErrors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full rounded-[10px] bg-[#B88E2F] py-3.5 font-poppins text-base font-semibold text-white transition hover:bg-[#9E7824] cursor-pointer disabled:opacity-50"
              >
                {isSubmittingLogin ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitRegister(onRegisterSubmit)} className="space-y-5">
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  {...registerRegister("name")}
                  className={`w-full rounded-[10px] border bg-white px-4 py-3 font-poppins text-sm text-black outline-none transition ${
                    registerErrors.name ? "border-red-500" : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {registerErrors.name && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">{registerErrors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...registerRegister("email")}
                  className={`w-full rounded-[10px] border bg-white px-4 py-3 font-poppins text-sm text-black outline-none transition ${
                    registerErrors.email ? "border-red-500" : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {registerErrors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">{registerErrors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  {...registerRegister("password")}
                  className={`w-full rounded-[10px] border bg-white px-4 py-3 font-poppins text-sm text-black outline-none transition ${
                    registerErrors.password ? "border-red-500" : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {registerErrors.password && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">{registerErrors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  {...registerRegister("confirmPassword")}
                  className={`w-full rounded-[10px] border bg-white px-4 py-3 font-poppins text-sm text-black outline-none transition ${
                    registerErrors.confirmPassword ? "border-red-500" : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {registerErrors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">{registerErrors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingRegister}
                className="w-full rounded-[10px] bg-[#B88E2F] py-3.5 font-poppins text-base font-semibold text-white transition hover:bg-[#9E7824] cursor-pointer disabled:opacity-50"
              >
                {isSubmittingRegister ? "Creating account..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Benefits />
    </main>
  );
};
