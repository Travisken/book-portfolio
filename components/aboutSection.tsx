import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
            >
                <section id="about" className="md:w-[88%] flex-1 flex justify-center items-center flex-col mx-auto gap-8 text-center">
                    <h2 className="text-4xl font-bold">
                        About me
                    </h2>

                    <div className="bg-[#00000002] md:p-4 p-2 md:rounded-xl">
                        Akinsiku Folarin is the CEO of Pentspace, a thriving e-commerce platform dedicated to enhancing user connections with businesses and services. Beyond the digital marketplace, he is deeply committed to revolutionizing healthcare in Nigeria through global collaboration and knowledge transfer at CNHPD(Community of Nigerian Healthcare Professionals in diaspora).
                        CNHPD is a network of dedicated Health professionals committed to enhancing Nigeria’s healthcare sector. United by a shared vision of national development, they focus on bridging local practices with global standards through technical collaborations and networking.
                        Currently pursuing an MBA at the University of Kansas, Folarin merges healthcare innovation with strategic business insights, leveraging a unique blend of financial acumen, customer service excellence, and analytical expertise. With a background in dentistry and a passion for technological empowerment, he champions transformative projects that bridge clinical excellence with efficient healthcare administration.
                        Through his work, he envisions a future where strategic investments and technology-driven solutions drive sustainable healthcare systems, improving accessibility and patient outcomes.
                    </div>
                </section>
            </motion.div>
        </>
    )
}