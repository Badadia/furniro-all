type CategoriesCardProps = {
  image: string;
  label: string;
};
const CategoriesCard = ({ image, label }: CategoriesCardProps) => {
  return (
    <article className="group flex flex-col items-center gap-7.5">
      <div className="h-120 w-[90vw] overflow-hidden rounded-[10px] sm:w-95.25">
        <div
          className="h-full w-full cursor-pointer bg-cover bg-center bg-no-repeat transition group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      <h3 className="cursor-pointer font-poppins text-[24px] font-semibold text-primary-text transition group-hover:tracking-widest group-hover:text-primary-text-100">
        {label}
      </h3>
    </article>
  );
};
export default CategoriesCard;
