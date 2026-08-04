import { useState } from "react";

interface FilterProps {
  category: string;
  onChange: (category: string) => void;
}

const categories = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Dining",
    value: "Dining",
  },
  {
    label: "Living",
    value: "Living",
  },
  {
    label: "Bedroom",
    value: "Bedroom",
  },
];

function Filter({
  category,
  onChange,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Atualiza a categoria selecionada e fecha o menu.
  function handleSelect(value: string) {
    onChange(value);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-3
          cursor-pointer
        "
      >
        <img
          src="/IconsShopTool/filter.svg"
          alt="Filter"
        />

        <span
          className="
            font-poppins
            text-base
            sm:text-[20px]
          "
        >
          Filter
        </span>
        
      </button>

      {isOpen && (
        <div
          className="
            absolute left-0 top-full z-20
            mt-3 w-44
            rounded-md
            bg-white
            shadow-lg
          "
        >
          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={`
                w-full
                px-4 py-3
                text-left
                font-poppins
                transition
                cursor-pointer

                hover:bg-[#F9F1E7]

                ${
                  category === item.value
                    ? "bg-[#F9F1E7] font-medium"
                    : ""
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;