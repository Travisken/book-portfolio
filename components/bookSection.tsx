"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import CustomCard from "./customCard";
import BookCard from "./bookCard";
import { Book } from "@/app/types";
// import type { Book } from "@/types/book"; // ✅ Import shared type

interface BooksSectionProps {
  books: Book[];
  loading: boolean;
  handleOpen: (book: Book) => void;
}

export default function BooksSection({ books, loading, handleOpen }: BooksSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id="books"
      className="flex flex-col gap-10 items-center md:px-20 px-4 py-8"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="flex w-full justify-between items-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold">Books</h2>
        {books.length > 4 && (
          <Link
            href="/books"
            className="p-2 rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex w-[8rem] items-center justify-center"
          >
            See more
          </Link>
        )}
      </motion.div>

      {loading ? (
        <motion.div
          className="flex justify-center items-center h-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader">Loading...</div>
        </motion.div>
      ) : (
        <>
          {books.length === 1 ? (
            <>
              <motion.div
                className="hidden md:flex md:mt-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <CustomCard book={books[0]} />
              </motion.div>

              <motion.div
                className="block md:hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <BookCard book={books[0]} onReadMore={() => handleOpen(books[0])} />
              </motion.div>
            </>
          ) : (
            <motion.div
              className="flex gap-8 flex-wrap md:gap-12 justify-start w-full items-start"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {books.slice(0, 4).map((book) => (
                <motion.div
                  key={book.id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <BookCard book={book} onReadMore={() => handleOpen(book)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
