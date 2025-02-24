"use client";

import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, get, remove } from "firebase/database";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import RichTextEditor from "./textEditor";
import { AnimatePresence, motion } from "framer-motion";

interface Book {
  id: number;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [errors, setErrors] = useState<Partial<Book>>({});
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

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setErrors({});
    // setIsOpen(false)
  };

  const validateForm = () => {
    if (!selectedBook) return false;
    const newErrors: Partial<Book> = {};

    if (!selectedBook.title) newErrors.title = "Title is required";
    if (!selectedBook.description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedBook) {
      const { name, value } = e.target;
      setSelectedBook({ ...selectedBook, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Updated book details:", selectedBook);
      closeModal();
    }
  };

  const deleteBook = async (id: number) => {
    if (!selectedBook) return;
    
    try {
      await remove(ref(database, `data/booksSection/${id.toString()}`));
      // Update book list after deletion
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setShowConfirm(false);
      closeModal();
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
          <div
            key={book.id}
            className="bg-white shadow-lg rounded-lg p-4 w-64 text-center"
          >
            <Image
              height={200}
              width={200}
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 whitespace-normal break-words">{book.title}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3 whitespace-normal break-words">{book.description}</p>
            <button
              onClick={() => openEditModal(book)}
              className="mt-4 bg-[#3ca0ca] text-white w-full  py-2 rounded-xl hover:bg-[#245e77]"
            >
              Edit Book
            </button>
            {/* <!-- From Uiverse.io by andrew-demchenk0 -->  */}
            <button
              onClick={() => confirmDelete(book)}
              className="button mt-4" type="button">
              <span className="button__text text-center">Delete book</span>
              <span className="button__icon">
                <svg className="icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>
            </button>
          </div>
        ))}
      </div>

      {showConfirm && (
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
                onClick={() => deleteBook(selectedBook.id)}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer rounded-lg"
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
