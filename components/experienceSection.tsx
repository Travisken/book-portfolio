"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  // Animation variants
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const experiences = [
    {
      image: "/penthouse_logo.jpeg",
      company: "Pentspace",
      role: "Chief Executive Officer",
      id: "pentspace",
      description:
        "Pentspace is an online marketplace app with the largest collection of businesses and services easily accessible to users.",
    },
    {
      image: "/orange_dentist_logo.jpeg",
      company: "Orange Dental Specialists",
      role: "Clinical Service Director",
      id: "orange-dental-specialists",
      description:
        "Orange Dental Specialists is a dental clinic located in Alagbaka, Akure, Ondo State with the vision to provide quality and accessible oral health care.",
    },
    {
      image: "/nmhpd_logo.PNG",
      company: "Community of Nigerian Health Personnel in Diaspora",
      role: "Member",
      id: "cnhpd",
      description:
        "The Community of Nigerian Health Personnel in Diaspora (CNHPD) comprises a dedicated group of professionals who plan to return to Nigeria in the near future to enhance the country’s health sector.",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <section className="flex flex-col w-full gap-10 md:p-20 p-4 mt-10 items-center justify-center">
        {/* Header */}
        <div className="flex w-full text-left md:flex-row flex-col justify-between gap-10 items-start md:items-center">
          <div>
            <h3 className="text-3xl capitalize font-semibold">
              My work experience
            </h3>
            <p>
              Showcasing skills, achievements, and career growth through
              professional experiences.
            </p>
          </div>
        </div>

        {/* Cards */}
        <motion.section
          variants={containerVariant}
          className="flex items-start flex-wrap md:px-20 px-4 gap-10 justify-center"
        >
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="group max-md:w-full overflow-hidden cursor-pointer flex-none md:flex-1 flex flex-col shadow rounded-xl p-2 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-52 w-full rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.company}
                  fill
                  className="rounded-xl group-hover:scale-[1.1] transition-all object-cover object-center"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-xl mt-6 line-clamp-1">
                  {item.company}
                </h3>
                <p className="text-[#00000090] text-sm">{item.role}</p>
                <p className="text-zinc-600 line-clamp-2 max-h-16 group-hover:max-h-full overflow-hidden transition-all duration-300 ease-in-out">
                  {item.description}
                </p>

                <Link
                  href={`/work-experience/#${item.id}`}
                  className="bg-[#00000020] items-center justify-center hover:text-[#00000999] transition-all border-2 text-lg border-[#000000020] hover:border-[#00000050] hover:bg-white rounded-full px-6 py-3 flex flex-1 gap-2 "
                >
                  Read more <ChevronRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </section>
    </motion.div>
  );
}
