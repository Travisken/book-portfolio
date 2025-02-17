import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutSection() {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <section id="about" className="md:w-[88%] flex-1 flex justify-center items-center flex-col mx-auto mt-12 gap-8 text-center">
                <h2 className="text-4xl font-bold">
                    About Me
                </h2>

                <div className="bg-[#00000015] md:p-4 p-2 md:rounded-xl text-left md:max-w-[88vw]">
                    <p>
                        Akinsiku Folarin is the CEO of Pentspace, a thriving e-commerce platform dedicated to enhancing user connections with businesses and services. Beyond the digital marketplace, he is deeply committed to revolutionizing healthcare in Nigeria through global collaboration and knowledge transfer at CNHPD (Community of Nigerian Healthcare Professionals in diaspora).
                    </p>

                    {expanded && (
                        <>
                            <p className="mt-4">
                                CNHPD is a network of dedicated healthcare professionals committed to enhancing Nigeria’s healthcare sector. United by a shared vision of national development, they focus on bridging local practices with global standards through technical collaborations and networking.
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
        </motion.div>
    );
}
