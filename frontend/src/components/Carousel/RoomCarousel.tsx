import { useState } from "react";
import HeroButton from "../Hero/HeroButton";
import CarouselCard from "./CarouselCard";
import Carousel from "./Carousel";

import Carousel1 from "/Carousel/Carousel1.png";
import Carousel2 from "/Carousel/Carousel2.png";
import Carousel3 from "/Carousel/Carousel3.png";
import Carousel4 from "/Carousel/Carousel4.png";

const rooms = [
  {
    image: Carousel1,
    type: "Bed Room",
    title: "Inner Peace",
  },
  {
    image: Carousel2,
    type: "Dining Room",
    title: "Modern Dining",
  },
  {
    image: Carousel3,
    type: "Living Room",
    title: "Cozy Living",
  },
  {
    image: Carousel4,
    type: "Work Space",
    title: "Creative Focus",
  },
];

const RoomCarousel = () => {
  const [currentRoom, setCurrentRoom] = useState(0);

  return (
    <section className="flex flex-wrap items-center justify-center gap-10.5 py-11">
      <div className="w-full max-w-105.5 p-4">
        <h2 className="mb-1.75 font-poppins text-[40px] font-bold leading-12 text-primary-text-200">
          50+ Beautiful rooms inspiration
        </h2>

        <p className="mb-6.25 font-poppins text-[16px] font-medium">
          Our designer already made a lot of beautiful prototype rooms that
          inspire you.
        </p>

        <HeroButton
          label="Explore More"
          className="h-12 w-44 normal-case text-[16px] font-semibold"
        />
      </div>

      <div className="flex flex-col justify-center gap-6 md:flex-row">
  <CarouselCard
    room={rooms[currentRoom]}
    index={currentRoom}
  />

      <Carousel
        rooms={rooms}
        currentRoom={currentRoom}
        onChangeRoom={setCurrentRoom}
      />
    </div>
    </section>
  );
};

export default RoomCarousel;