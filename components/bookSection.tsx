import Link from "next/link";
import BookCard from "./bookCard";
import { motion } from "framer-motion";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  buyLink: string;
}

const BookSection: React.FC<{ books?: Book[] }> = ({ books = [] }) => {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpen = (book: any) => {
    setSelectedBook(book);
    setOpen(true);
  };


  console.log("Books in BooksList:", books); // Debugging

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        {/* <div id="books" className="flex gap-10 flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-6">Books</h2>
            <Link href="/books" className="p-2  rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white  flex w-[8rem]  items-center justify-center">
              See more
            </Link>
          </div>

          <div className="flex overflow-x-scroll gap-8 justify-between items-center">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onReadMore={() => handleOpen(book)} />
            ))}
          </div>
        </div> */}
      </motion.div>
    </>
  );
};

export default BookSection;
