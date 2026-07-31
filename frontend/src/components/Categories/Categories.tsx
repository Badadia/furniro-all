import CategoriesCard from "./CategoriesCard";

import Categorie1 from "/Categories/Categorie1.png";
import Categorie2 from "/Categories/Categorie2.png";
import Categorie3 from "/Categories/Categorie3.png";

const Categories = () => {
  return (
    <section className="flex flex-col items-center py-[56.47px]">
      <div className="flex flex-col items-center px-4 pb-[62.29px]">
        <h2 className="text-center font-poppins text-[32px] font-bold text-primary-text">
          Browse The Range
        </h2>

        <p className="text-center font-poppins text-[20px] text-primary-text-100">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        <CategoriesCard image={Categorie1} label="Dining" />
        <CategoriesCard image={Categorie2} label="Living" />
        <CategoriesCard image={Categorie3} label="Bedroom" />
      </div>
    </section>
  );
};
export default Categories;
