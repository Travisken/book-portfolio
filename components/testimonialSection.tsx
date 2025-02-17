"use client";

import TestimonialCard from "./testimonialCard";
import testimonialData from "@/public/data.json";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

// Define the type for a single testimonial
interface Testimonial {
  id: string;
  name: string;
  message: string;
  // Add other fields as needed
}

interface TestimonialData {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div id="testimonialForm" className="h-[70vh] flex items-center bg-g">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>

          {isMobile ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full"
            >
              {(testimonialData as unknown as TestimonialData).testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard review={""} rating={0} {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex gap-10">
              {(testimonialData as unknown as TestimonialData).testimonials.map((testimonial) => (
                <TestimonialCard review={""} rating={0} key={testimonial.id} {...testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
