"use client";

import { useState } from "react";
// import BookSection from "@/components/bookSection";
import BookCard from "@/components/bookCard";
import BookModal from "@/components/bookModal";
import bookData from "@/public/data.json";

import HeroSection from "@/components/heroSection";
import TestimonialForm from "@/components/testimonialForm";
import AboutSection from "@/components/aboutSection";
import TestimonialSection from "@/components/testimonialSection";
import Link from "next/link";
import ExperienceSection from "@/components/experienceSection";

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  buyLink: string;
  published: boolean;
  rating: number;
}

const Home = () => {
  const books: Book[] = bookData?.booksSection ?? [];
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleOpen = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  return (
    <section>
      <HeroSection />
      <AboutSection />
      <ExperienceSection/>

      <div className="flex flex-col gap-10 items-center md:px-20 px-4 py-8">
        <div className="flex w-full justify-between items-center mt-8">
          <h2 className="text-3xl font-bold">Books</h2>
          {books.length > 4 && (
            <Link 
              href="/books" 
              className="p-2 rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex w-[8rem] items-center justify-center"
            >
              See more
            </Link>
          )}
        </div>

        <div className="flex gap-8 flex-wrap justify-center md:justify-between items-center">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onReadMore={() => handleOpen(book)} />
          ))}
        </div>
      </div>

      <TestimonialSection />
      <TestimonialForm />

      <BookModal open={open} onClose={() => setOpen(false)} book={selectedBook} />
    </section>
  );
};

export default Home;
