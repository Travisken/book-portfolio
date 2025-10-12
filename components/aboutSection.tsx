"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  // Scroll-based animation controls
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const introText =
    "Dr. Akinsiku Folarin Oluwanimbefunmi is a seasoned dentist with over 12 years of hands-on clinical experience and more than 5 years of leadership in organizational management within the healthcare sector. Throughout his career, he has skillfully blended clinical expertise with administrative acumen, making a significant impact in various leadership roles across small, medium, and large-scale medical institutions.";

  const introWords = introText.split(" ");

  // Animation Variants
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const expandedVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        },
      }}
      className="flex items-start justify-start md:mt-10 px-3 md:px-[5.2rem]"
    >
      <section className="flex-1 flex flex-col mx-auto gap-8 text-left">
        <h2 className="text-4xl font-bold">
          About Dr. Akinsiku Folarin Oluwanimbefunmi
        </h2>

        <div className="bg-[#00000015] md:p-4 p-2 md:rounded-xl text-left md:max-w-[88vw]">
          {/* Word-by-word intro paragraph */}
          <motion.p
            variants={container}
            className="leading-relaxed text-gray-800"
          >
            {introWords.map((word, i) => (
              <motion.span key={i} variants={wordVariant}>
                {word}{" "}
              </motion.span>
            ))}
          </motion.p>

          {/* Expanded Section */}
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div
                key="expanded"
                variants={expandedVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.p className="mt-4">
                  He currently serves as the CEO of Orange Dental Specialists, a
                  dental practice founded with a clear vision—to enhance the
                  quality and accessibility of oral healthcare. Under his
                  leadership, the organization has prioritized patient-centered
                  care, innovation, and service excellence in oral health
                  delivery.
                </motion.p>

                <motion.p className="mt-4">
                  In addition to his work in dentistry, Dr. Akinsiku is also a
                  tech entrepreneur. He is the founder and CEO of PentSpace, a
                  dynamic online marketplace app that hosts one of the largest
                  collections of businesses and services across various sectors.
                  Designed to simplify local and distant service discovery,
                  PentSpace enables users to locate, connect with, and review
                  businesses and services conveniently, bridging accessibility
                  gaps and empowering informed choices. Driven by a passion for
                  systemic healthcare improvement, Dr. Akinsiku is the convener
                  of the Community of Nigerian Healthcare Professionals in
                  Diaspora (CNHPD). This initiative aims to leverage the
                  technical expertise, resources, and strategic insights of
                  diaspora-based professionals to strengthen healthcare systems
                  in Nigeria through collaborative projects and knowledge
                  transfer.
                </motion.p>

                <motion.p className="mt-4">
                  Currently pursuing an MBA at the University of Kansas, USA,
                  Dr. Akinsiku is committed to expanding his business and
                  leadership skills to further his mission of improving
                  healthcare delivery, fostering innovation, and building
                  sustainable health and tech ecosystems in Nigeria and beyond.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            whileTap={{ scale: 0.95 }}
            className="mt-4 text-blue-500 hover:underline font-medium"
          >
            {expanded ? "See Less" : "See More"}
          </motion.button>
        </div>
      </section>
    </motion.section>
  );
}
