import Benefits from "../components/Benefits/Benefits";
import PageBanner from "../components/Shop/PageBanner";

export const Contact = () => {
  return (
    <main className="min-h-screen bg-white">
      <PageBanner
        title="Contact"
        breadcrumbHome="Home"
        breadcrumbCurrent="Contact"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold font-poppins">Get In Touch With Us</h1>
      </section>
      <Benefits />
    </main>
  );
};
