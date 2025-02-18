"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/bookCard";
import BookModal from "@/components/bookModal";
import HeroSection from "@/components/heroSection";
import TestimonialForm from "@/components/testimonialForm";
import AboutSection from "@/components/aboutSection";
import TestimonialSection from "@/components/testimonialSection";
import Link from "next/link";
import ExperienceSection from "@/components/experienceSection";
import { database } from '@/app/firebase'; // Adjust path as necessary
import { ref, get } from 'firebase/database';

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  bookLink: string;
  published: boolean;
  rating: number;
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

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const booksRef = ref(database, 'booksSection'); // Adjust the path based on your structure
  //       const snapshot = await get(booksRef);

  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         console.log('Fetched data:', data);

  //         // Assuming data can be an object or an array
  //         const booksArray = Array.isArray(data) ? data : Object.values(data);
  //         setBooks(data.booksSection);
  //       } else {
  //         console.log('No books found');
  //         setBooks([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching books:", error);
  //       setBooks([]);
  //     } finally {
  //       setLoading(false); // Stop loading when done
  //     }
  //   };

  //   fetchBooks();
  // }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const testimonialsRef = ref(database, 'data'); // Adjust the path based on your structure
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val(); // Log fetched data
          
          // Assuming testimonials are the fourth element in the array
          const testimonialArray = data[3] ? data[3] : [];
          console.log('Testimonials array:', testimonialArray); // Log testimonials array
          setBooks(data.booksSection);
        } else {
          console.log('No testimonials found');
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
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

      <div id="books" className="flex flex-col gap-10 items-center md:px-20 px-4 py-8">
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

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader">Loading...</div> {/* Add loader styling as needed */}
          </div>
        ) : (
          <div className="flex gap-8 flex-wrap md:gap-0 justify-center md:!justify-between w-full items-center">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onReadMore={() => handleOpen(book)} />
            ))}
          </div>
        )}
      </div>

      <TestimonialSection />
      <TestimonialForm />

      <BookModal open={open} onClose={() => setOpen(false)} book={selectedBook} />
    </section>
  );
};

export default Home;