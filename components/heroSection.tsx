// import Image from "next/image";
import Link from "next/link";


const HeroSection: React.FC = () => {
    return (
        <>
            <section className="flex flex-wrap text-center md:text-left md:justify-between md:p-0 p-4 md:h-[90vh] md:px-20  items-center">
                <div className="flex flex-col md:w-[40%] gap-4 items-center md:items-start">
                    <h3 className="md:text-5xl text-3xl md:w-[80%] font-extrabold">
                        Akinsiku Folarin
                    </h3>
                    <p>
                    CEO of Pentspace, integrates e-commerce, healthcare innovation, and global collaboration to enhance business connections, bridge local and global healthcare standards, and drive sustainable, technology-driven solutions for Nigeria’s healthcare sector.
                    </p>
                    <Link href="#about" className=" rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white  flex w-[8rem] md:w-[14rem] py-3 items-center justify-center">
                        Books
                    </Link>
                </div>
                <div style={{ backgroundImage: "url('/author.jpeg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "90%",
                    backgroundPosition: "center"

                 }} className=" h-[70vh] w-full md:w-[40%] flex">
                </div>

            </section>
        </>
    )
}

export default HeroSection;