"use client";

import TestimonialCard from "./testimonialCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { database } from '@/app/firebase'; // Adjust path as necessary
import { ref, get } from 'firebase/database';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
}

const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = ref(database, 'data'); // Adjust the path based on your structure
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val(); // Log fetched data
          
          // Assuming testimonials are the fourth element in the array
          const testimonialArray = data[3] ? data[3] : [];
          console.log('Testimonials array:', testimonialArray); // Log testimonials array
          setTestimonials(data.testimonials);
        } else {
          console.log('No testimonials found');
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div id="testimonials" className="h-[70vh] flex items-center bg-g">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-6">Testimonials</h2>
          {loading ? ( // Show loader while fetching
            <div className="flex justify-center items-center h-full">
              <div className="loader">Loading...</div>
            </div>
          ) : isMobile ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard bookName={""} {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex gap-10">
              {testimonials.map((testimonial) => (
                <TestimonialCard bookName={""} key={testimonial.id} {...testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;