import { useForm } from "react-hook-form";
import { zodResolver } from "../utils/zodResolver";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { z } from "zod";
import Benefits from "../components/Benefits/Benefits";
import PageBanner from "../components/Shop/PageBanner";

const contactSchema = z.object({
  name: z.string().min(2, "Por favor, informe seu nome"),
  email: z.string().email("Digite um e-mail válido"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    // Simula o envio da mensagem
    console.log("Contact form submitted:", data);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Banner Superior */}
      <PageBanner
        title="Contact"
        breadcrumbHome="Home"
        breadcrumbCurrent="Contact"
      />

      {/* Conteúdo Principal */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-poppins text-3xl md:text-[36px] font-semibold text-black mb-3">
            Get In Touch With Us
          </h1>
          <p className="font-poppins text-sm md:text-base text-[#9F9F9F] max-w-[644px] mx-auto leading-relaxed">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Coluna Esquerda: Informações de Contato */}
          <div className="md:col-span-5 space-y-10">
            {/* Endereço */}
            <div className="flex items-start gap-6">
              <div className="text-black text-2xl pt-1">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h2 className="font-poppins text-2xl font-medium text-black mb-1">
                  Address
                </h2>
                <p className="font-poppins text-base text-black leading-relaxed">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            {/* Telefone */}
            <div className="flex items-start gap-6">
              <div className="text-black text-2xl pt-1">
                <FaPhoneAlt />
              </div>
              <div>
                <h2 className="font-poppins text-2xl font-medium text-black mb-1">
                  Phone
                </h2>
                <p className="font-poppins text-base text-black">
                  Mobile: +(84) 546-6789
                </p>
                <p className="font-poppins text-base text-black">
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div className="flex items-start gap-6">
              <div className="text-black text-2xl pt-1">
                <FaClock />
              </div>
              <div>
                <h2 className="font-poppins text-2xl font-medium text-black mb-1">
                  Working Time
                </h2>
                <p className="font-poppins text-base text-black">
                  Monday-Friday: 9:00 - 22:00
                </p>
                <p className="font-poppins text-base text-black">
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Your name */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="Abc"
                  {...register("name")}
                  className={`w-full rounded-[10px] border bg-white px-6 py-5 font-poppins text-base text-black placeholder:text-[#9F9F9F] outline-none transition ${
                    errors.name
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 font-poppins">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email address */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Abc@def.com"
                  {...register("email")}
                  className={`w-full rounded-[10px] border bg-white px-6 py-5 font-poppins text-base text-black placeholder:text-[#9F9F9F] outline-none transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#9F9F9F] focus:border-[#B88E2F]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 font-poppins">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject (Opcional) */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="This is an optional"
                  {...register("subject")}
                  className="w-full rounded-[10px] border border-[#9F9F9F] bg-white px-6 py-5 font-poppins text-base text-black placeholder:text-[#9F9F9F] outline-none transition focus:border-[#B88E2F]"
                />
              </div>

              {/* Message (Opcional) */}
              <div>
                <label className="block font-poppins text-base font-medium text-black mb-3">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Hi! I'd like to ask about"
                  {...register("message")}
                  className="w-full rounded-[10px] border border-[#9F9F9F] bg-white px-6 py-5 font-poppins text-base text-black placeholder:text-[#9F9F9F] outline-none transition focus:border-[#B88E2F] resize-none"
                />
              </div>

              {/* Botão Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-[5px] bg-[#B88E2F] px-20 py-3.5 font-poppins text-base font-normal text-white transition hover:bg-[#9E7824] cursor-pointer disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <Benefits />
    </main>
  );
};
