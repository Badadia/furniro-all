import { SORT_OPTIONS } from "@/constants/shop";

interface SortByProps {
  sort: string;
  onSortChange: (sort: string) => void;
}

function SortBy({ sort, onSortChange }: SortByProps) {
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
        onChange={(event) => onSortChange(event.target.value)}
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

          ${sort === "default" ? "text-[#9F9F9F]" : "text-black"}
        `}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
