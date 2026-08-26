import Benefits from "../components/Benefits/Benefits";
import PageBanner from "../components/Shop/PageBanner";

export const Checkout = () => {
  return (
    <main className="min-h-screen bg-white">
      <PageBanner
        title="Checkout"
        breadcrumbHome="Home"
        breadcrumbCurrent="Checkout"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-poppins">Billing details</h1>
      </section>
      <Benefits />
    </main>
  );
};
