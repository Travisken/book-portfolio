"use client";

import { Link } from "react-scroll";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Books", href: "books" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handle scroll lock when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto"; // Clean up on unmount
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.filter(link => link.href.startsWith("#"));
            let currentSection = "";

            sections.forEach(({ href }) => {
                const section = document.querySelector(href);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = href;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="flex w-full justify-between md:p-0 px-4 items-center relative">
            <div className="flex justify-between items-center w-full md:px-20">
                <Link href="/" to={"/"}>
                    <div className="bg-[#3ca0ca] logo justify-center font-bold h-24 flex w-32 flex-col px-4 text-white">
                        <span className="text-xl">Dr.</span>
                        <span className="text-2xl">Folarin.</span>
                    </div>
                </Link>
                <ul className="hidden md:flex gap-12 items-center text-xl">
                    {navLinks.map(({ name, href }) => (
                        <li key={href}>
                            <Link
                                className={`nav_link cursor-pointer ${pathname.startsWith(href) || activeSection === href ? "text-[#3ca0ce] font-bold" : "text-black"} transition-colors text-xl duration-300`}
                                smooth={true} duration={500} to={href}
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    className="py-3 hidden cursor-pointer md:flex rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white w-[12rem] h-fit items-center justify-center"
                    to={"testimonialForm"}
                >
                    Feedback
                </Link>
            </div>

            <div className="md:hidden relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative flex flex-col gap-1 w-6 h-5 justify-center"
                >
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
                    ></span>
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                    ></span>
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
                    ></span>
                </button>

                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                                onClick={() => setIsMenuOpen(false)}
                            ></motion.div>

                            {/* Menu */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-12 -right-2 rounded-md bg-white z-20 shadow-md p-4 w-[94vw]"
                            >
                                <ul className="flex flex-col gap-4">
                                    {navLinks.map(({ name, href }) => (
                                        <li key={href}>
                                            <Link
                                                className="block text-black hover:text-[#3ca0ce] font-semibold cursor-pointer"
                                                smooth={true} duration={500} to={href}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    className="py-3 mt-8 rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex w-full h-fit items-center justify-center"
                                    to={"testimonialForm"}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Feedback
                                </Link>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
