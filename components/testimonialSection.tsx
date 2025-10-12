"use client";

import TestimonialCard from "./testimonialCard";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import { database } from "@/app/firebase";
import { ref, get } from "firebase/database";

interface Testimonial {
  id: string;
  fullName: string;
  rating: number;
  review: string;
  email: string;
  approved: boolean;
  bookName: string;
}

const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-50px", once: false });

  const handleToggle = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = ref(database, "data/testimonials");
        const snapshot = await get(testimonialsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const testimonialArray: Testimonial[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTestimonials(testimonialArray);
        } else {
          console.log("No testimonials found");
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      exit={{ opacity: 0, y: -60 }}
      className="min-h-[70vh] md:px-20 flex items-center bg-g"
    >
      <div className="container px-4 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold text-left mb-6"
        >
          Testimonials
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader">Loading...</div>
          </div>
        ) : isMobile ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={activeCard === null ? { delay: 30000, disableOnInteraction: false } : false}
            onSlideChange={() => setActiveCard(null)}
            modules={[Pagination, Autoplay]}
            className="w-full"
          >
            {testimonials
              .filter((t) => t.approved)
              .map((testimonial, index) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <TestimonialCard
                      key={index}
                      {...testimonial}
                      isExpanded={activeCard === index}
                      onToggle={() => handleToggle(index)}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div className="flex gap-4 justify-center">
            {testimonials
              .filter((t) => t.approved)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="w-full"
                >
                  <TestimonialCard
                    {...testimonial}
                    isExpanded={activeCard === index}
                    onToggle={() => handleToggle(index)}
                  />
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
