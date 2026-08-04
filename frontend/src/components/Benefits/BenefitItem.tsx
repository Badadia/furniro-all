type BenefitItemProps = {
  icon: string;
  title: string;
  description: string;
};

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="min-w-50 flex items-center gap-3 basis-[48%] lg:basis-auto">
      <img src={icon} alt={title} className="w-10 h-10 lg:w-auto lg:h-auto" />

      <div>
        <p className="text-[#242424] font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[25px]">
          {title}
        </p>

        <h2 className="text-[#898989] font-poppins font-medium text-[14px] md:text-[16px] lg:text-[20px]">
          {description}
        </h2>
      </div>
    </div>
  );
}

export default BenefitItem;
