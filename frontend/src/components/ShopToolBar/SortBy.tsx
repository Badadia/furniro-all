interface SortByProps {
  sort: string;
  onSortChange: (sort: string) => void;
}

// Opções de ordenação.
// Os valores podem ser ajustados conforme a API.
const sortOptions = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Price: Low to High",
    value: "price_asc",
  },
  {
    label: "Price: High to Low",
    value: "price_desc",
  },
];


function SortBy({
  sort,
  onSortChange,

}: SortByProps) {


  return (

    <div
      className="
        flex
        items-center
        gap-3
        sm:gap-4
      "
    >

      <span
        className="
          font-poppins
          text-[16px]
          sm:text-[20px]
        "
      >
        Sort by
      </span>



      <select

        value={sort}

// Atualiza a opção de ordenação selecionada.
        onChange={(event)=>
          onSortChange(event.target.value)
        }

        className={`
          h-[55px]
          w-[150px]
          sm:w-[188px]
          rounded-[10px]
          bg-white
          px-3
          sm:px-4
          font-poppins
          text-[14px]
          sm:text-[16px]
          outline-none

          ${
            sort === "default"
              ? "text-[#9F9F9F]"
              : "text-black"
          }
        `}
      >

        {sortOptions.map((option)=>(

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}


      </select>


    </div>

  );

}


export default SortBy;