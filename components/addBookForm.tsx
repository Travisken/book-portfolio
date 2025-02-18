"use client"

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const BookUploadForm = () => {
  const [bookData, setBookData] = useState({
    bookName: "",
    bookDescription: "",
    aboutBook: "",
    contributors: "",
    bookCover: null as File | null,
  });

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

    console.log("Form submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full gap-6 flex p-6 bg-white  rounded-lg ">
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

      {/* Drag & Drop Upload Box */}


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

      <div>
        <label className="block text-sm font-medium text-gray-700">About the Book</label>
        <textarea
          name="aboutBook"
          placeholder=""
          value={bookData.aboutBook}
          onChange={(e) => setBookData({ ...bookData, aboutBook: e.target.value })}
          className="w-full mt-1 p-3 border focus:outline-[#3ca0ca] rounded-xl"
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

      <button type="submit" className="w-full bg-[#3ca0ca] text-white p-3 rounded-xl hover:bg-[#3ca0ca]">
        Upload Book
      </button> 
        </section>
      
        <div className="flex-1 mt-2 border-4 border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3ca0ca] transition ">
        <label className="block text-xl font-medium text-gray-500">Book Cover Photo</label>
        <div
          {...getRootProps()}
          className="mt-2  p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {preview ? (
            <Image layout="fill" src={preview} alt="Preview" className="w-[20rem] h-[20rem] object-cover rounded-lg" />
          ) : (
            <p className="text-gray-500 hover:text-[#3ca0ca]">Drag & Drop or Click to Upload</p>
          )}
        </div>
        {errors.bookCover && <p className="text-red-500 text-sm">{errors.bookCover}</p>}
      </div>
    </form>
  );
};

export default BookUploadForm;
