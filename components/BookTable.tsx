"use client";

import bookData from "@/public/data.json";
import { useState } from "react";

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
  const [books, setBooks] = useState<Book[]>(bookData?.booksSection ?? []);

  const handleEdit = (id: number) => {
    console.log(`Edit book with ID: ${id}`);
    // Add edit functionality here
  };
  
  return (
    <section>
      <div className="flex  flex-col gap-10 items-start overflow-x-scroll px-4 w-[70vw] py-8">
        <div className="flex overflow-scroll  gap-8 md:gap-4 justify-center md:justify-between ">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="bg-white shadow-lg rounded-lg p-4 w-full md:!w-[20rem] flex flex-col items-center text-center"
            >
              <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-xl font-semibold mt-4">{book.title}</h2>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{book.description}</p>
              <div className="flex justify-between items-center w-full mt-4">
                <span className="text-sm font-medium text-gray-700">
                  {book.published ? "Published" : "Unpublished"}
                </span>
                <span className="text-yellow-500 font-semibold">⭐ {book.rating}</span>
              </div>
              <button 
                onClick={() => handleEdit(book.id)}
                className="mt-4 bg-[#3ca0ca] text-white w-full py-3 rounded-xl hover:bg-[#245e77]"
              >
                Edit Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookTable;
