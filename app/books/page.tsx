"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "@/components/bookCard";

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  buyLink: string;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
    const handleOpen = (book: Book) => {
      setSelectedBook(book);
      setOpen(true);
    };
  

  useEffect(() => {
    fetch("/data.json") // Fetching from public directory
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging
        setBooks(data.booksSection ?? []);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <>
    
     <div className="flex gap-10 flex-col px-4 py-8" suppressHydrationWarning>
<h1 className="text-4xl font-bold">
    Books
</h1>
      <div className="flex gap-8 justify-between items-center">
      {books.map((book) => (
            <BookCard key={book.id} book={book} onReadMore={() => handleOpen(book)} />
          ))}
      </div>
    </div>

    </>
   
  );
};

export default BooksPage;
