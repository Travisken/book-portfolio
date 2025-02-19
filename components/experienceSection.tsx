import { motion } from "framer-motion";
import Image from "next/image";

export default function ExperienceSection() {

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >

            <section className="flex flex-col w-full gap-10 md:p-10 mt-10 items-center justify-center">

                <div className="flex flex-col items-center p-6 justify-center">
                    <h3 className="text-3xl capitalize font-semibold">
                        My work experience
                    </h3>

                    <p>
                    Showcasing skills, achievements, and career growth through professional experiences.
                    </p>
                </div>

                <section className="flex items-start flex-wrap p-6 gap-10 justify-center">
                    <div className="card w-full md:w-[20rem] flex flex-col shadow rounded-xl p-2">
                        <div className="relative h-52 w-fill rounded-xl overflow-hidden">
                            <Image
                                src="/penthouse_logo.jpeg"
                                alt="/penthouse_logo.jpeg"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-xl mt-6">Penthouse</h3>
                            <p className="text-[#00000090] text-sm">
                                Cheif Executive Officer
                            </p>
                            <p className="text-zinc-600 line-clamp-3">
                                Pentspace is an online marketplace app with the largest collection of businesses and services easily accessible to users.</p>
                        </div>
                    </div>

                    <div className="card w-full md:w-[20rem] flex flex-col shadow rounded-xl p-2">
                        <div className="relative h-52 w-fill bg-red-500 rounded-xl overflow-hidden">
                            <Image
                                src="/orange_dentist_logo.jpeg"
                                alt="/penthouse_logo.jpeg"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-xl mt-6">Orange dental specialists</h3>
                            <p className="text-[#00000090] text-sm">
                                Clinical service director
                            </p>
                            <p className="text-zinc-600 line-clamp-3">
                                Orange Dental Specialists is a dental clinic located in Alagbaka, Akure, Ondo State with the vision to provide quality and accessible oral health care.</p>
                        </div>
                    </div>

                    <div className="card w-full md:w-[20rem] flex flex-col shadow rounded-xl p-2">
                        <div className="relative h-52 w-fill rounded-xl overflow-hidden">
                        <Image
                                src="/nmhpd_logo.jpeg"
                                alt="/penthouse_logo.jpeg"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-xl mt-6 line-clamp-1">Community of Nigerian Health Personnel in Diaspora</h3>
                            <p className="text-[#00000090] text-sm">
                                Member
                            </p>
                            <p className="text-zinc-600 line-clamp-3">
                            The Community of Nigerian Health Personnel in Diaspora (CNHPD) comprises a dedicated group of professionals who plan to return to Nigeria in the near future to enhance the country&apos;s health sector.
                                </p>
                        </div>
                    </div>
                </section>



            </section>


        </motion.div>
    );
}
