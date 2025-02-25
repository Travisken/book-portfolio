// import Image from "next/image";
import Link from "next/link";


const HeroSection: React.FC = () => {
    return (
        <>
            <section className="flex mt-[5rem] relative flex-wrap text-center md:text-left md:justify-between md:p-0 p-4 md:h-[90vh] md:px-20  items-center">
                <div className="flex flex-col md:w-[50%] gap-4 items-center md:items-start">
                    <h3 className=" m-0 p-0 md:text-5xl text-3xl md:w-[80%] font-extrabold">
                        Dr. Akinsiku Folarin
                    </h3>
                    <p>
                        CEO of Pentspace, integrates e-commerce, healthcare innovation, and global collaboration to enhance business connections, bridge local and global healthcare standards, and drive sustainable, technology-driven solutions for Nigeria’s healthcare sector.
                    </p>
                    <Link href="#books" className=" rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white  flex w-[8rem] md:w-[14rem] py-3 mt-2 items-center justify-center">
                        Books
                    </Link>
                </div>
                <div style={{
                    backgroundImage: "url('/author.jpeg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",

                }} className=" h-[550px] bg-top md:bg-right w-full relative md:w-[35%] md:border-white mt-10 md:mt-0 md:border-8 flex">
                    <div className="absolute -z-[1] -top-14 -left-16 md:grid hidden grid-cols-5  gap-4">
                        {[...Array(25)].map((_, i) => (
                            <span key={i} className="w-3 h-3 bg-gray-300 rounded-full"></span>
                        ))}
                    </div>
                    <div className="bg-[#00000015] -z-[1] absolute -top-20 -left-20 md:flex hidden h-[25rem] aspect-square"></div>
                </div>


            </section>
        </>
    )
}

export default HeroSection;