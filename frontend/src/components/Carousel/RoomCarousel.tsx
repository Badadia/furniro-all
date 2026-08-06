import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { getImage } from "../../lib/assets";

import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const rooms = [
  {
    id: 1,
    title: "Inner Peace",
    category: "Bed Room",
    image: "Carousel1.png",
  },
  {
    id: 2,
    title: "Minimalist",
    category: "Dining Room",
    image: "Carousel2.png",
  },
  {
    id: 3,
    title: "Cozy",
    category: "Living Room",
    image: "Carousel3.png",
  },
  {
    id: 4,
    title: "Modern",
    category: "Work Space",
    image: "Carousel4.png",
  },
];

const CarouselNextButton = () => {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => swiper.slideNext()}
      aria-label="Próxima imagem"
      className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-white hover:bg-[#B88E2F] text-[#B88E2F] hover:text-white w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-lg transition-colors cursor-pointer"
    >
      <FiChevronRight size={24} />
    </button>
  );
};

export default function RoomCarousel() {
  return (
    <section className="bg-[#FCF8F3] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 relative">
        <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start relative z-20 bg-[#FCF8F3] md:bg-transparent">
          <h2 className="text-3xl md:text-[40px] leading-tight font-bold text-black mb-4 font-sans">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="text-[#616161] mb-8 text-sm md:text-base">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you
          </p>
          <Link to="/shop">
            <button className="bg-[#B88E2F]  hover:bg-secundary hover:text-over-secundary border-2 border-over-secundary text-white font-bold py-3 px-8 transition-colors cursor-pointer">
              Explore More
            </button>
          </Link>
        </div>

        <div className="md:w-2/3 w-full relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2.2 },
            }}
            pagination={{ clickable: true }}
            loop={true}
            className="room-swiper h-[450px] md:h-[580px]"
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id} className="h-full">
                {({ isActive }) => (
                  <div
                    className={`relative w-full transition-all duration-500 ease-out ${
                      isActive
                        ? "h-[400px] md:h-[540px]"
                        : "h-[350px] md:h-[460px]"
                    }`}
                  >
                    <img
                      src={getImage(room.image)}
                      alt={room.title}
                      className="w-full h-full object-cover shadow-md"
                    />

                    {isActive && (
                      <>
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-6 flex flex-col justify-center gap-1 z-10 w-[220px] h-[130px] shadow-sm animate-fade-in">
                          <div className="flex items-center gap-2 text-[#616161] text-sm font-medium">
                            <span>0{room.id}</span>
                            <span className="w-4 h-px bg-[#616161]"></span>
                            <span>{room.category}</span>
                          </div>
                          <h3 className="text-black font-semibold text-2xl">
                            {room.title}
                          </h3>
                        </div>

                        <button className="absolute bottom-6 left-[246px] bg-[#B88E2F] text-white w-12 h-12 flex items-center justify-center z-10 animate-fade-in cursor-pointer">
                          <FiArrowRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}
            <CarouselNextButton />
          </Swiper>
        </div>
      </div>

      <style>{`
        .room-swiper {
          overflow: hidden !important; 
        }
        
        .room-swiper .swiper-pagination {
          position: absolute;
          width: auto !important;
          left: 50% !important; 
          transform: translateX(-50%);
          bottom: 16px !important; 
          display: flex;
          align-items: center;
          z-index: 20;
        }
        
        @media (min-width: 768px) {
          .room-swiper .swiper-pagination {
            transform: none;
            left: 45% !important; 
            bottom: 40px !important;
          }
        }

        .room-swiper .swiper-pagination-bullet {
          width: 11px;
          height: 11px;
          background-color: #D8D8D8;
          opacity: 1;
          margin: 0 8px !important;
          transition: all 0.3s ease;
        }
        
        .room-swiper .swiper-pagination-bullet-active {
          background-color: #B88E2F;
          position: relative;
        }
        
        .room-swiper .swiper-pagination-bullet-active::after {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 1px solid #B88E2F;
          border-radius: 50%;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
