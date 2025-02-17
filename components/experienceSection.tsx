import { motion } from "framer-motion";

export default function ExperienceSection() {

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >

            <section className="flex flex-col gap-4 w-fit">
                <div className="flex flex-row gap-4 justify-end items-end">
                    <div className="rounded-xl bg-red-500 h-[10rem] aspect-square" ></div>
                    <div className="rounded-xl bg-red-500 h-[8rem] w-[8rem]" ></div>
                </div>
                <div className="flex gap-4 ml-4 flex-row-reverse">
                    <div className="rounded-xl bg-red-500 h-[10rem] aspect-square" ></div>
                    <div className="rounded-xl bg-red-500 h-[8rem] w-[8rem]" ></div>
                </div>

            </section>


        </motion.div>
    );
}
