import BenefitItem from "./BenefitItem";

const benefits = [
  {
    icon: "/IconsBenefits/trophy.svg",
    title: "High Quality",
    description: "Crafted from top materials",
  },
  {
    icon: "/IconsBenefits/guarantee.svg",
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: "/IconsBenefits/shipping.svg",
    title: "Free Shipping",
    description: "Order over 150 $",
  },
  {
    icon: "/IconsBenefits/support.svg",
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

function Benefits() {
  return (
    <div className="w-full mx-auto px-4 bg-[#FAF3EA]">
      <div className="w-full max-w-333.5 mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-y-8 py-10 lg:py-25">
        {benefits.map((benefit) => (
          <BenefitItem
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Benefits;
