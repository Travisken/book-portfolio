import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <section className="flex flex-col w-full gap-10 md:p-20 p-4 mt-10 items-center justify-center">
                <div className="flex w-full text-left md:flex-row flex-col justify-between gap-10 items-start md:items-center">
                    <div>
                        <h3 className="text-3xl capitalize font-semibold">My work experience</h3>
                        <p>Showcasing skills, achievements, and career growth through professional experiences.</p>
                    </div>
                    <Link href={"/work-experience"} className="bg-[#00000020] hover:text-[#00000090] transition-all border-2 border-[#000000020] hover:border-[#00000050] hover:bg-white rounded-full p-4 hidden md:flex gap-4">
                        Read more <ChevronRight />
                    </Link>
                </div>

                <section className="flex items-start flex-wrap md:px-20 px-4 gap-10 justify-center">
                    {/** Card Component */}
                    {[
                        {
                            image: "/penthouse_logo.jpeg",
                            company: "Penthouse",
                            role: "Chief Executive Officer",
                            description:
                                "Pentspace is an online marketplace app with the largest collection of businesses and services easily accessible to users.",
                        },
                        {
                            image: "/orange_dentist_logo.jpeg",
                            company: "Orange Dental Specialists",
                            role: "Clinical Service Director",
                            description:
                                "Orange Dental Specialists is a dental clinic located in Alagbaka, Akure, Ondo State with the vision to provide quality and accessible oral health care.",
                        },
                        {
                            image: "/nmhpd_logo.PNG",
                            company: "Community of Nigerian Health Personnel in Diaspora",
                            role: "Member",
                            description:
                                "The Community of Nigerian Health Personnel in Diaspora (CNHPD) comprises a dedicated group of professionals who plan to return to Nigeria in the near future to enhance the country’s health sector.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="group max-md:w-full overflow-hidden cursor-pointer flex-none md:flex-1 flex flex-col shadow rounded-xl p-2 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="relative h-52 w-full rounded-xl overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.company}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    className="rounded-xl group-hover:scale-[1.1] transition-all"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-xl mt-6 line-clamp-1">{item.company}</h3>
                                <p className="text-[#00000090] text-sm">{item.role}</p>
                                <p className="text-zinc-600 line-clamp-2 max-h-16 group-hover:max-h-full overflow-hidden transition-all duration-300 ease-in-out">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    <button className="bg-[#00000020] hover:text-[#00000090] transition-all border-2 border-[#000000020] hover:border-[#00000050] hover:bg-white w-full items-center justify-center rounded-full p-4 flex md:hidden gap-4">
                        Read more <ChevronRight />
                    </button>
                </section>
            </section>
        </motion.div>
    );
}
