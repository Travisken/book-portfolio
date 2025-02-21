"use client";

import { useEffect, useState } from "react";
import { database } from "@/app/firebase"; // Adjust the path as necessary
import { ref, get } from "firebase/database";

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  bookDocument: string;
  published: boolean;
  rating: number;
}

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books from Firebase Realtime Database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = ref(database, "data/booksSection"); // Adjust the path to your Firebase structure
        const snapshot = await get(booksRef);

        if (snapshot.exists()) {
          const booksData = snapshot.val();
          const booksArray = Object.keys(booksData).map((key) => ({
            id: booksData[key].id,
            title: booksData[key].title, // Ensure the field names match your Firebase structure
            description: booksData[key].description,
            image: booksData[key].image, // Ensure this matches the field name in Firebase
            bookDocument: booksData[key].bookDocument,
            published: booksData[key].published,
            rating: booksData[key].rating || 0, // Default to 0 if rating is not available
          }));
          setBooks(booksArray);
        } else {
          setError("No books found in the database.");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit book with ID: ${id}`);
  };

  if (loading) {
    return <div className="text-center py-4">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <section>
      <div className="flex flex-col gap-10 items-start overflow-x-scroll w-[80vw] md:w-[70vw]">
        <div className="flex overflow-scroll gap-8 md:gap-4 py-4 justify-center md:justify-between">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white md:shadow-lg rounded-lg p-4 w-[16rem] md:w-[20rem] flex flex-col items-center text-center"
            >
              <img
                src={`${book.image}`}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md"
              />
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