"use client";

import { useEffect, useState } from "react";
// import BookCard from "@/components/bookCard";
import BookModal from "@/components/bookModal";
import HeroSection from "@/components/heroSection";
import TestimonialForm from "@/components/testimonialForm";
import AboutSection from "@/components/aboutSection";
import TestimonialSection from "@/components/testimonialSection";
// import Link from "next/link";
import ExperienceSection from "@/components/experienceSection";
import { database } from '@/app/firebase'; // Adjust path as necessary
import { ref, get } from 'firebase/database';
import BttButton from "@/components/bttButton";
// import CustomCard from "@/components/customCard";
import NewsSection from "@/components/newsSection";
import BooksSection from "@/components/bookSection";

interface Book {
  id: number;
  bookName: string;
  description: string; // Add this line
  image: string;
  aboutBook: string; // Add this line
  title: string; // Add this line
  bookDescription: string;
  bookDocument: string;
  bookLink: string;
  published: boolean;
  rating: number;
  contributors: string;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  const handleOpen = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const testimonialsRef = ref(database, 'data'); // Adjust the path based on your structure
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log('Fetched data:', data); // Log the entire data structure

          // Check if data has booksSection and whether it's an array
          if (data.booksSection) {
            const booksArray = Array.isArray(data.booksSection) ? data.booksSection : Object.values(data.booksSection);
            setBooks(booksArray);
            // console.log(booksArray)
          } else {
            console.log('No books found in data');
            setBooks([]);
          }
        } else {
          console.log('No data found');
          setBooks([]);
        }


      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchBooks();
  }, []);

  return (
    <section>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <NewsSection />
      <BooksSection books={books} loading={loading} handleOpen={handleOpen} />
      <TestimonialSection />
      <TestimonialForm />
      {open && selectedBook && (
        <BookModal open={open} onClose={() => setOpen(false)} book={selectedBook} />
      )}
      <BttButton />
    </section>
  );
};

export default Home;