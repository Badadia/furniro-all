import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "../utils/zodResolver";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import Benefits from "../components/Benefits/Benefits";
import PageBanner from "../components/Shop/PageBanner";
import { fetchAddressByCep } from "../services/viacep.service";
import { useAuthStore } from "../stores/auth.store";
import { useCartStore } from "../stores/cart.store";
import { calculateDiscount, formatPrice } from "../utils/price";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Informe seu primeiro nome"),
  lastName: z.string().min(2, "Informe seu sobrenome"),
  companyName: z.string().optional(),
  zipCode: z.string().min(8, "Informe um CEP válido (8 dígitos)"),
  country: z.string().min(2, "Informe o país"),
  streetAddress: z.string().min(3, "Informe o endereço"),
  city: z.string().min(2, "Informe a cidade"),
  province: z.string().min(2, "Informe o estado/província"),
  addonAddress: z.string().optional(),
  email: z.string().email("Digite um e-mail válido"),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(["direct_bank", "bank_transfer", "cash_on_delivery"], {
    message: "Selecione uma forma de pagamento para continuar",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const Checkout = () => {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "direct_bank" | "bank_transfer" | "cash_on_delivery"
  >("direct_bank");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || "",
      country: "Brazil",
      paymentMethod: "direct_bank",
    },
  });

  // Consulta automática na API do ViaCEP
  const handleZipCodeBlur = async (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    const rawCep = e.target.value;
    const cleanCep = rawCep.replace(/\D/g, "");

    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      const address = await fetchAddressByCep(cleanCep);
      setIsLoadingCep(false);

      if (address) {
        setValue("streetAddress", address.logradouro || "");
        setValue("city", address.localidade || "");
        setValue("province", address.uf || "");
        setValue("country", "Brazil");
        toast.success("Endereço preenchido automaticamente via CEP!");
      } else {
        toast.error("CEP não encontrado. Preencha os campos manualmente.");
      }
    }
  };

  const onSubmit = (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    console.log("Order placed successfully:", data);
    toast.success("Pedido realizado com sucesso! Obrigado pela sua compra!", {
      duration: 5000,
    });
    clearCart();
    navigate("/shop");
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Banner Superior */}
      <PageBanner
        title="Checkout"
        breadcrumbHome="Home"
        breadcrumbCurrent="Checkout"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Coluna Esquerda: Detalhes de Faturamento (Billing details) */}
            <div className="lg:col-span-7 space-y-7">
              <h1 className="font-poppins text-3xl md:text-[36px] font-semibold text-black mb-9">
                Billing details
              </h1>

              {/* Nome e Sobrenome */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-poppins text-base font-medium text-black mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-[#9F9F9F] focus:border-[#B88E2F]"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-500 font-poppins">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-poppins text-base font-medium text-black mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-[#9F9F9F] focus:border-[#B88E2F]"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-500 font-poppins">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Company Name (Opcional) */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  className="w-full rounded-[10px] border border-[#9F9F9F] bg-white px-5 py-4 font-poppins text-base text-black outline-none transition focus:border-[#B88E2F]"
                />
              </div>

              {/* ZIP code (CEP - Com consulta ViaCEP) */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  ZIP code
                  {isLoadingCep && (
                    <span className="ml-2 text-xs text-[#B88E2F]">
                      (Consultando CEP...)
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  {...register("zipCode")}
                  onBlur={handleZipCodeBlur}
                  className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                    errors.zipCode
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.zipCode && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              {/* Country / Region */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Country / Region
                </label>
                <input
                  type="text"
                  {...register("country")}
                  className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                    errors.country
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.country && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Street address */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Street address
                </label>
                <input
                  type="text"
                  {...register("streetAddress")}
                  className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                    errors.streetAddress
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.streetAddress && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>

              {/* Town / City */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Town / City
                </label>
                <input
                  type="text"
                  {...register("city")}
                  className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                    errors.city
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Province / State */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Province
                </label>
                <input
                  type="text"
                  {...register("province")}
                  className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                    errors.province
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.province && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">
                    {errors.province.message}
                  </p>
                )}
              </div>

              {/* Add-on address (Opcional) */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Add-on address
                </label>
                <input
                  type="text"
                  {...register("addonAddress")}
                  className="w-full rounded-[10px] border border-[#9F9F9F] bg-white px-5 py-4 font-poppins text-base text-black outline-none transition focus:border-[#B88E2F]"
                />
              </div>

              {/* Email address */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full rounded-[10px] border bg-white px-5 py-4 font-poppins text-base text-black outline-none transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-poppins">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Additional information */}
              <div>
                <input
                  type="text"
                  placeholder="Additional information"
                  {...register("additionalInfo")}
                  className="w-full rounded-[10px] border border-[#9F9F9F] bg-white px-5 py-4 font-poppins text-base text-black outline-none transition placeholder:text-[#9F9F9F] focus:border-[#B88E2F]"
                />
              </div>
            </div>

            {/* Coluna Direita: Resumo do Pedido & Formas de Pagamento */}
            <div className="lg:col-span-5 pt-4">
              <div className="space-y-6">
                {/* Tabela de Produtos */}
                <div className="flex items-center justify-between font-poppins text-2xl font-medium text-black pb-4 border-b border-[#D9D9D9]">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {items.length === 0 ? (
                    <div className="py-4 text-center text-[#9F9F9F] font-poppins text-sm">
                      Nenhum produto selecionado.{" "}
                      <Link to="/shop" className="text-[#B88E2F] underline">
                        Ir para a loja
                      </Link>
                    </div>
                  ) : (
                    items.map((item) => {
                      const itemSubtotal =
                        calculateDiscount(item.price, item.discount) *
                        item.quantity;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between font-poppins text-sm text-black"
                        >
                          <span className="text-[#9F9F9F] truncate max-w-[200px]">
                            {item.name}{" "}
                            <span className="text-black font-medium">
                              X {item.quantity}
                            </span>
                          </span>
                          <span className="font-light">
                            {formatPrice(itemSubtotal)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Subtotal e Total */}
                <div className="flex items-center justify-between font-poppins text-base text-black pt-2">
                  <span>Subtotal</span>
                  <span className="font-light">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between font-poppins text-base text-black pb-6 border-b border-[#D9D9D9]">
                  <span>Total</span>
                  <span className="text-2xl font-bold text-[#B88E2F]">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Opções de Pagamento */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 font-poppins text-base text-black cursor-pointer">
                      <input
                        type="radio"
                        value="direct_bank"
                        {...register("paymentMethod")}
                        onChange={(e) => {
                          register("paymentMethod").onChange(e);
                          setSelectedPaymentMethod("direct_bank");
                        }}
                        className="accent-black h-4 w-4"
                      />
                      <span className="font-medium">Direct Bank Transfer</span>
                    </label>

                    {selectedPaymentMethod === "direct_bank" && (
                      <p className="font-poppins text-sm text-[#9F9F9F] leading-relaxed pl-7">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-3 font-poppins text-base text-[#9F9F9F] cursor-pointer">
                      <input
                        type="radio"
                        value="bank_transfer"
                        {...register("paymentMethod")}
                        onChange={(e) => {
                          register("paymentMethod").onChange(e);
                          setSelectedPaymentMethod("bank_transfer");
                        }}
                        className="accent-black h-4 w-4"
                      />
                      <span>Direct Bank Transfer</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 font-poppins text-base text-[#9F9F9F] cursor-pointer">
                      <input
                        type="radio"
                        value="cash_on_delivery"
                        {...register("paymentMethod")}
                        onChange={(e) => {
                          register("paymentMethod").onChange(e);
                          setSelectedPaymentMethod("cash_on_delivery");
                        }}
                        className="accent-black h-4 w-4"
                      />
                      <span>Cash On Delivery</span>
                    </label>
                  </div>

                  {errors.paymentMethod && (
                    <p className="text-xs text-red-500 font-poppins pl-7">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>

                {/* Aviso de Privacidade */}
                <p className="font-poppins text-sm text-black leading-relaxed font-light pt-3">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <span className="font-semibold cursor-pointer">
                    privacy policy.
                  </span>
                </p>

                {/* Botão Place order */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="mx-auto block rounded-[15px] border border-black px-16 py-4 font-poppins text-xl font-normal text-black transition hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Place order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Seção de Benefícios */}
      <Benefits />
    </main>
  );
};
