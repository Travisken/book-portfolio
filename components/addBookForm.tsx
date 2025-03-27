"use client"

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import RichTextEditor from "./textEditor";
import axios from "axios";
import { database } from "@/app/firebase";
import { ref, get } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleAlert } from "lucide-react";

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
  const [editBook, setEditBook] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      if (id) {
        const bookRef = ref(database, `data/booksSection/${id}`);
        const snapshot = await get(bookRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBookData(() => ({
            ...data,
            bookLink: data.bookLink || null, // Keep existing book link if available
            bookDocument: data.bookDocument || null, // Keep existing document if available
          }));

          setEditBook(true);
          setPreview(null);

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
    if (!bookData.published) {
      toast.error("You cannot upload a book document unless the book is published.");
      return;
    }

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bookData.title) newErrors.title = "Title is required";
    if (!bookData.description) newErrors.description = "Description is required";
    if (!bookData.aboutBook) newErrors.aboutBook = "About the book is required";
    if (!bookData.bookLink) newErrors.bookLink = "Book cover is required";

    // Only validate book document if 'published' is true
    if (bookData.published && !bookData.bookDocument) {
      newErrors.bookDocument = "Book document is required when publishing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return toast.error("Please fill out all required fields.");
    setLoading(true);
  
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("description", bookData.description);
    formData.append("aboutBook", bookData.aboutBook);
    formData.append("contributors", bookData.contributors);
    formData.append("published", String(bookData.published));
  
    if (bookData.bookLink instanceof File) formData.append("bookLink", bookData.bookLink);
    if (bookData.bookDocument) formData.append("bookDocument", bookData.bookDocument);
  
    try {
      if (id) {
        // If `id` exists, update the existing book using PATCH
        console.log("Updating book with ID:", id);
        await axios.patch(`https://server-uc0a.onrender.com/upload/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Book updated successfully!");
      } else {
        // If no `id`, create a new book using POST
        await axios.post("https://server-uc0a.onrender.com/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Book uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload/update book. Check console for details.");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <ToastContainer />
      <h2 className="font-semibold text-3xl pb-4">
        {editBook ? "Edit Book" : "Add Book"}
      </h2>
      {editBook && <p className="text-gray-600 md:w-1/2 flex gap-2"> <CircleAlert /> Please when editing the book data always re-upload the book cover photo and the book document.</p>}
      <form onSubmit={handleSubmit} className="w-full md:flex-nowrap flex-wrap gap-6 flex p-6 bg-white rounded-lg">
        <section className="space-y-4 max-w-lg mx-auto">

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
              onChange={(e) => {
                setBookData((prev) => ({
                  ...prev,
                  published: e.target.checked,
                  bookDocument: e.target.checked ? prev.bookDocument : null, // Keep document when publishing
                }));

                if (!e.target.checked) {
                  toast.warn("Book document upload is disabled when the book is not published.");
                }
              }}
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
          <div
            {...getRootPropsDocument()}
            className={`border-4 border-dashed ${bookData.published ? "border-gray-400 hover:border-[#3ca0ca]" : "border-gray-300 opacity-50"
              } p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer transition`}
            style={{ pointerEvents: bookData.published ? "auto" : "none" }} // Disable interaction
          >
            <label className="block text-xl font-medium text-gray-500">Book Document</label>
            <div className="p-2 rounded-xl flex flex-col items-center justify-center">
              <input {...getInputPropsDocument()} disabled={!bookData.published} />
              {bookData.bookDocument ? (
                <p>Document uploaded</p>
              ) : (
                <p className="text-gray-500">
                  {bookData.published ? "Drag & Drop or Click to Upload" : "Disabled until book is published"}
                </p>
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
