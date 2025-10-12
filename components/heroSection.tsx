"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import HealthQuotesCarousel from "./healthQuotes";

const HeroSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // triggers both enter and leave
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const textVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="flex mt-[8rem] relative flex-wrap text-center md:text-left md:justify-between md:p-0 p-4 md:h-[90vh] md:px-20 items-start"
    >
      <motion.div
        className="flex flex-col md:w-[50%] gap-4 items-center md:items-start"
        variants={textVariant}
        initial="hidden"
        animate={controls}
      >
        <motion.h3
          variants={textVariant}
          className="m-0 p-0 md:text-5xl text-3xl md:w-[80%] font-extrabold"
        >
          Dr. Akinsiku Folarin Oluwanimbe
        </motion.h3>

        <motion.p
          variants={textVariant}
          className="md:w-[90%] text-xl text-gray-600"
        >
          Is a seasoned dentist with over 12 years of hands-on clinical
          experience and more than 5 years of leadership in organizational
          management within the healthcare sector.
        </motion.p>

        <motion.div variants={textVariant}>
          <Link
            href="#books"
            className="rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex w-[8rem] md:w-[14rem] py-3 mt-2 items-center justify-center"
          >
            Books
          </Link>
        </motion.div>

        <motion.div variants={textVariant}>
          <HealthQuotesCarousel />
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="h-[550px] bg-top md:bg-top w-full relative md:w-[35%] md:border-white mt-10 md:mt-0 md:border-8 flex"
        style={{
          backgroundImage: "url('/author.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <div className="absolute -z-[1] -top-14 -left-16 md:grid hidden grid-cols-5 gap-4">
          {[...Array(25)].map((_, i) => (
            <span key={i} className="w-3 h-3 bg-gray-300 rounded-full"></span>
          ))}
        </div>
        <div className="bg-[#00000015] -z-[1] absolute -top-20 -left-20 md:flex hidden h-[25rem] aspect-square"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
