"use client"

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import RichTextEditor from "./textEditor";
import axios from "axios";
import { database } from "@/app/firebase";
import { ref, set, get } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BookData {
  title: string;
  description: string;
  aboutBook: string;
  contributors: string;
  bookLink: File | string | null;
  bookDocument: File | null;
  published: boolean;
}

const BookUploadForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    description: "",
    aboutBook: "",
    contributors: "",
    bookLink: null,
    bookDocument: null,
    published: false,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url, window.location.origin);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      if (id) {
        const bookRef = ref(database, "data/booksSection/" + id);
        const snapshot = await get(bookRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBookData(data);

          if (data.bookLink && isValidUrl(data.bookLink)) {
            setPreview(data.bookLink);
          } else {
            setPreview(null);
          }
        }
      }
    };

    fetchBookData();
  }, [id]);

  const onDropCover = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setBookData((prev) => ({ ...prev, bookLink: file }));
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, bookLink: "" }));
    }
  };

  const onDropDocument = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setBookData((prev) => ({ ...prev, bookDocument: file }));
      setErrors((prev) => ({ ...prev, bookDocument: "" }));
    }
  };

  const { getRootProps: getRootPropsCover, getInputProps: getInputPropsCover } = useDropzone({
    onDrop: onDropCover,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const { getRootProps: getRootPropsDocument, getInputProps: getInputPropsDocument } = useDropzone({
    onDrop: onDropDocument,
    accept: { "application/pdf": [] },
    maxFiles: 1,
  });

  const resetForm = () => {
    setBookData({
      title: "",
      description: "",
      aboutBook: "",
      contributors: "",
      bookLink: null,
      bookDocument: null,
      published: false,
    });
    setPreview(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bookData.title) newErrors.title = "Title is required";
    if (!bookData.description) newErrors.description = "Description is required";
    if (!bookData.aboutBook) newErrors.aboutBook = "About the book is required";
    if (!bookData.bookLink) newErrors.bookLink = "Book cover is required";
    if (!bookData.bookDocument) newErrors.bookDocument = "Book document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fill out all required fields.");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  // Include the book ID to differentiate between creating and updating
  const numericId = id || Date.now();
  formData.append("bookId", numericId); // Send the ID to the server
  if (bookData.bookLink instanceof File) {
    formData.append("bookLink", bookData.bookLink);
  }
  formData.append("bookDocument", bookData.bookDocument as Blob);
  formData.append("title", bookData.title);
  formData.append("description", bookData.description);
  formData.append("aboutBook", bookData.aboutBook);
  formData.append("contributors", bookData.contributors);
  formData.append("published", String(bookData.published));

  try {
    const response = await axios.post("https://server-uc0a.onrender.com/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { bookLink, bookDocument } = response.data;

    const bookRef = ref(database, "data/booksSection/" + numericId);
    await set(bookRef, {
      id: numericId,
      ...bookData,
      bookLink,
      bookDocument,
    });

    toast.success("Book data submitted successfully!");
    resetForm();
  } catch (error) {
    console.error("Error submitting book data:", error);
    toast.error("An error occurred while submitting the book data.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-full md:flex-nowrap flex-wrap gap-6 flex p-6 bg-white rounded-lg">
        <section className="space-y-4 max-w-lg mx-auto">
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Name</label>
            <input
              type="text"
              name="title"
              placeholder="Add book name"
              value={bookData.title}
              onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
              className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Book Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Description</label>
            <input
              name="description"
              placeholder="Add a brief description"
              value={bookData.description}
              onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
              className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* About the Book */}
          <div>
            <label className="block text-sm font-medium text-gray-700">About the Book</label>
            <input
              type="text"
              value={bookData.aboutBook || ""} // Ensure the value is never undefined
              readOnly
              placeholder="Click to write about the book"
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl cursor-pointer"
            />
            {errors.aboutBook && <p className="text-red-500 text-sm">{errors.aboutBook}</p>}
          </div>

          {/* Contributors */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contributors (Optional)</label>
            <input
              type="text"
              name="contributors"
              value={bookData.contributors}
              onChange={(e) => setBookData({ ...bookData, contributors: e.target.value })}
              className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl"
            />
          </div>

          {/* Published Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={bookData.published}
              onChange={(e) => setBookData({ ...bookData, published: e.target.checked })}
            />
            <label className="text-sm font-medium text-gray-700">Is this book published?</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#3ca0ca] text-white p-3 rounded-xl hover:bg-[#3ca0ca] disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Uploading..." : id ? "Update Book" : "Upload Book"}
          </button>
        </section>

        {/* Cover and Document Upload Sections */}
        <section className="flex flex-col gap-10">
          {/* Cover Photo Dropzone */}
          <div className="flex-1 h-[65%] border-4 border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3ca0ca] transition">
            <label className="block text-xl font-medium text-gray-500">Book Cover Photo</label>
            <div {...getRootPropsCover()} className="mt-2 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer">
              <input {...getInputPropsCover()} />
              {preview ? (
                <Image
                  height={300}
                  width={300}
                  src={preview || ""}
                  alt="Preview"
                  className="w-[20rem] h-[20rem] object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500 hover:text-[#3ca0ca]">Drag & Drop or Click to Upload</p>
              )}
            </div>
            {errors.bookLink && <p className="text-red-500 text-sm">{errors.bookLink}</p>}
          </div>

          {/* Document Dropzone */}
          <div{...getRootPropsDocument()} className="border-4 border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3ca0ca] transition">
            <label className="block text-xl font-medium text-gray-500">Book Document</label>
            <div  className="p-2 rounded-xl flex flex-col items-center justify-center cursor-pointer">
              <input {...getInputPropsDocument()} />
              {bookData.bookDocument ? (
                <p>Document uploaded</p>
              ) : (
                <p className="text-gray-500 hover:text-[#3ca0ca]">Drag & Drop or Click to Upload</p>
              )}
            </div>
            {errors.bookDocument && <p className="text-red-500 text-sm">{errors.bookDocument}</p>}
          </div>
        </section>

        {/* Rich Text Editor Modal */}
        <RichTextEditor
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(text) => {
            setBookData((prev) => ({ ...prev, aboutBook: text }));
            setIsModalOpen(false);
          }}
          value={bookData.aboutBook}
        />
      </form>
    </>
  );
};

export default BookUploadForm;
