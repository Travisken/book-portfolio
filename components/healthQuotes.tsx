// import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const quotes = [
  {
    text: "Let food be thy medicine and medicine be thy food.",
    author: "Hippocrates"
  },
  {
    text: "The greatest wealth is health.",
    author: "Virgil"
  },
  {
    text: "A healthy outside starts from the inside.",
    author: "Robert Urich"
  },
  {
    text: "Health is not valued until sickness comes.",
    author: "Thomas Fuller"
  },
  {
    text: "It is health that is real wealth and not pieces of gold and silver.",
    author: "Mahatma Gandhi"
  }
];

const HealthQuotesCarousel = () => {
  return (
    <div className="w-[30rem] mt-[4rem] hidden md:flex py-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="rounded-2xl bg-[#00000015]"
      >
        {quotes.map((quote, index) => (
          <SwiperSlide key={index}>
            <div className="p-8 rounded-2xl font-extralight tracking-wide text-black">
              <p className="text-2xl italic  mb-4">&quot;{quote.text}&quot;</p>
              <p className="text-lg font-semibold italic">- {quote.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HealthQuotesCarousel;
