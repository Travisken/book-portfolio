"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import RichTextEditor from "./textEditor";

const BookUploadForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookData, setBookData] = useState({
    bookName: "",
    bookDescription: "",
    aboutBook: "",
    contributors: "",
    bookCover: null as File | null,
    bookDocument: null as File | null,
    isPublished: false,
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  function openModal() {

  }


  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setBookData((prev) => ({ ...prev, bookCover: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Accept only images
    maxFiles: 1,
  });

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!bookData.bookName) newErrors.bookName = "Book name is required";
    if (!bookData.bookDescription) newErrors.bookDescription = "Book description is required";
    if (!bookData.aboutBook) newErrors.aboutBook = "About the book is required";
    if (!bookData.bookCover) newErrors.bookCover = "Book cover is required";
    if (!bookData.bookDocument) newErrors.bookDocument = "Book Document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("bookName", bookData.bookName);
    formData.append("bookDescription", bookData.bookDescription);
    formData.append("aboutBook", bookData.aboutBook);
    if (bookData.contributors) formData.append("contributors", bookData.contributors);
    if (bookData.bookCover) formData.append("bookCover", bookData.bookCover);
    if (bookData.bookDocument) formData.append("bookDocument", bookData.bookDocument);
    formData.append("isPublished", String(bookData.isPublished));

    console.log("Form submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:flex-nowrap flex-wrap gap-6 flex p-6 bg-white rounded-lg">
      <section className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700">Book Name</label>
          <input
            type="text"
            name="bookName"
            placeholder="Add book name"
            value={bookData.bookName}
            onChange={(e) => setBookData({ ...bookData, bookName: e.target.value })}
            className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl"
          />
          {errors.bookName && <p className="text-red-500 text-sm">{errors.bookName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Book Description</label>
          <input
            name="bookDescription"
            placeholder="Add a brief description"
            value={bookData.bookDescription}
            onChange={(e) => setBookData({ ...bookData, bookDescription: e.target.value })}
            className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl"
          />
          {errors.bookDescription && <p className="text-red-500 text-sm">{errors.bookDescription}</p>}
        </div>

        {/* Rich Text Editor */}
        <div>
            <label className="block text-sm font-medium text-gray-700">About the Book</label>
            <input
              type="text"
              value={bookData.aboutBook}
              readOnly
              placeholder="Click to write about the book"
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl cursor-pointer"
            />
            {errors.aboutBook && <p className="text-red-500 text-sm">{errors.aboutBook}</p>}
          </div>

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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bookData.isPublished}
            onChange={(e) => setBookData({ ...bookData, isPublished: e.target.checked })}
          />
          <label className="text-sm font-medium text-gray-700">Is this book published?</label>
        </div>

        <button type="submit" className="w-full bg-[#3ca0ca] text-white p-3 rounded-xl hover:bg-[#3ca0ca]">
          Upload Book
        </button>
      </section>


      <section className=" flex flex-col gap-10">

        <div className="flex-1 h-[65%] border-4 border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3ca0ca] transition">
          <label className="block text-xl font-medium text-gray-500">Book Cover Photo</label>
          <div {...getRootProps()} className="mt-2 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer">
            <input {...getInputProps()} />
            {preview ? (
              <Image layout="fill" src={preview} alt="Preview" className="w-[20rem] h-[20rem] object-cover rounded-lg" />
            ) : (
              <p className="text-gray-500 hover:text-[#3ca0ca]">Drag & Drop or Click to Upload</p>
            )}
          </div>
          {errors.bookCover && <p className="text-red-500 text-sm">{errors.bookCover}</p>}
        </div>


        <div className=" border-4 border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3ca0ca] transition">
          <label className="block text-xl font-medium text-gray-500">Book Document</label>
          <div {...getRootProps()} className=" p-2 rounded-xl flex flex-col items-center justify-center cursor-pointer">
            <input {...getInputProps()} />
            {preview ? (
              <p>document preview</p>
            ) : (
              <p className="text-gray-500 hover:text-[#3ca0ca]">Drag & Drop or Click to Upload</p>
            )}
          </div>
          {errors.bookCover && <p className="text-red-500 text-sm">{errors.bookDocument}</p>}
        </div>
      </section>
      <RichTextEditor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(text) => {
          setBookData((prev) => ({ ...prev, aboutBook: text }));
          setIsModalOpen(false); // Close the modal after saving
        }}
        value={bookData.aboutBook}
      />
    </form>
  );
};

export default BookUploadForm;
