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
    <div className="w-[30rem] relative mt-[4rem] hidden md:flex py-10">
      <span className='absolute -top-1 right-0 text-[14rem] text-[#3ca0ca]'>
        {/* &quot; */}
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="70" viewBox="0 0 24 24" fill="none" stroke="#3ca0ca" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-quote"><path fill='#3ca0ca' d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path fill='#3ca0ca' d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg>
      </span>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="rounded-2xl !h-[10rem] bg-[#00000015]"
      >
        {quotes.map((quote, index) => (
          <SwiperSlide key={index} className=''>
            <div className="p-8 rounded-2xl tracking-wide text-black">
              <p className="text-2xl font-thin italic  mb-4">&quot;{quote.text}&quot;</p>
              <p className="text-lg font-semibold italic text-[#3ca0ca]">- {quote.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HealthQuotesCarousel;
