"use client";

import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, get, remove } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import { FiPenTool } from "react-icons/fi";

interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  bookLink: string;
  published: boolean;
  rating: number;
  aboutBook?: string;
  contributors?: string;
}

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = ref(database, "data/booksSection");
        const snapshot = await get(booksRef);

        if (snapshot.exists()) {
          const booksData = snapshot.val();
          const booksArray = Object.keys(booksData).map((key) => ({
            ...booksData[key],
            id: key,
            rating: booksData[key].rating || 0,
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

  const confirmDelete = (book: Book) => {
    setSelectedBook(book);
    setShowConfirm(true);
  };

  const deleteBook = async () => {
    if (!selectedBook) return;

    try {
      await remove(ref(database, `data/booksSection/${selectedBook.id}`));
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id));
      setShowConfirm(false);
      setSelectedBook(null);
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again later.");
    }
  };

  if (loading) return <div className="text-center py-4">Loading books...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className="w-[70vw] overflow-scroll">
      <div className="flex min-w-[80vw] overflow-scroll gap-8 py-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-lg rounded-lg p-4 w-64 text-center">
            <Image
              height={200}
              width={200}
              src={book.bookLink}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 break-words">{book.title}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3 break-words">
              {book.description}
            </p>

            <Link
              href={`/dashboard/add-book?id=${book.id}`}
              className="button_book mt-4 !bg-[#3ca0ca] !border-none"
            >
              <span className="button__text">Edit book</span>
              <span className="button__icon hover:!bg-[#1d6787] !bg-[#1d6787] text-white text-3xl font-semibold">
                <FiPenTool className="text-2xl" />
              </span>
            </Link>

            <button onClick={() => confirmDelete(book)} className="button_book mt-4">
              <span className="button__text">Delete book</span>
              <span className="button__icon">
                <svg
                  className="icon"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        ))}
      </div>

      {showConfirm && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this book?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteBook}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookTable;