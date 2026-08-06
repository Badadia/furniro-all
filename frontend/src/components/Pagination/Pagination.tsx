interface PaginationProps {
  limit: number;
  total: number;
  offset: number;
  onPageChange: (offset: number) => void;
}

function Pagination({ limit, total, offset, onPageChange }: PaginationProps) {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
    goToTop();
  };

  const handleNext = () => {
    if (currentPage === totalPages) {
      handlePageChange(1);
    } else {
      handlePageChange(currentPage + 1);
    }
    goToTop();
  };

  return (
    <div
      className="
               flex
               justify-center
               items-center
               gap-[38px]
               py-[15px]
        "
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`
                            w-12 h-12
                            sm:w-[60px] sm:h-[60px]
                            rounded-[10px]
                            font-poppins
                            font-normal
                            cursor-pointer
                            text-[20px]
                            leading-[30px]
                            transition
                            ${
                              currentPage === page
                                ? "bg-[#B88E2F] text-white"
                                : "bg-[#F9F1E7] text-black"
                            }
                        `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        className="
                    w-[80px] h-12
                    sm:w-[98px] sm:h-[60px]
                    rounded-[10px]
                    font-poppins
                    font-normal
                    text-[20px]
                    cursor-pointer
                    leading-[30px]
                    bg-[#F9F1E7]
                    text-black
                    transition
                "
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
