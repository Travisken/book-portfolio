import { motion } from "framer-motion";
import { useState } from "react";
// import ExperienceSection from "./experienceSection";

export default function AboutSection() {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <section id="about" className="flex items-start justify-start px-3 md:px-[5.2rem]">
                <section className=" flex-1 flex justify-start items-left flex-col mx-auto gap-8 text-left">
                <h2 className="text-4xl text-left font-bold">
                    Hi, I&apos;m Dr. Akinsiku Folarin
                </h2>

                <div className="bg-[#00000015] md:p-4 p-2 md:rounded-xl text-left md:max-w-[88vw]">
                    <p>
                        I&apos;m the CEO of Pentspace, a thriving e-commerce platform dedicated to enhancing user connections with businesses and services. Beyond the digital marketplace, he is deeply committed to revolutionizing healthcare in Nigeria through global collaboration and knowledge transfer at CNHPD (Community of Nigerian Healthcare Professionals in diaspora).
                    </p>

                    {expanded && (
                        <>
                            <p className="mt-4">
                                CNHPD is a network of dedicated healthcare professionals committed to enhancing Nigeria&apos;s healthcare sector. United by a shared vision of national development, they focus on bridging local practices with global standards through technical collaborations and networking.
                            </p>
                            <p className="mt-4">
                                Currently pursuing an MBA at the University of Kansas, Folarin merges healthcare innovation with strategic business insights. He leverages a unique blend of financial acumen, customer service excellence, and analytical expertise.
                            </p>
                            <p className="mt-4">
                                With a background in dentistry and a passion for technological empowerment, he champions transformative projects that bridge clinical excellence with efficient healthcare administration.
                            </p>
                            <p className="mt-4">
                                Through his work, he envisions a future where strategic investments and technology-driven solutions drive sustainable healthcare systems, improving accessibility and patient outcomes.
                            </p>
                        </>
                    )}

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-4 text-blue-500 hover:underline"
                    >
                        {expanded ? "See Less" : "See More"}
                    </button>
                </div>

            </section>
                {/* <ExperienceSection></ExperienceSection> */}
            </section>
            
        </motion.div>
    );
}
