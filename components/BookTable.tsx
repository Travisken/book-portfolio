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
  bookLink: string;
  published: boolean;
  rating: number;
}

const BookTable = () => {
  const books: Book[] = bookData?.booksSection ?? [];
  
  return (
    <section>
    
      <div id="books" className="flex flex-col gap-10 items-center md:px-20 px-4 py-8">
    
        <div className="flex gap-8 flex-wrap md:gap-0 justify-center md:!justify-between w-full items-center">
          {books.map((book) => (
            
            <div>



            </div>


          ))}
        </div>
      </div>
</section>
  );
};

export default BookTable;
