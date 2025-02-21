"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import RichTextEditor from "./textEditor";
import { database, storage } from "@/app/firebase"; // Adjust the path as necessary
import { ref, set, get } from "firebase/database"; // Import get for fetching data
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";

// Same interface for book data
interface BookData {
  title: string;
  description: string;
  aboutBook: string;
  contributors: string;
  bookLink: File | null;
  bookDocument: File | null;
  published: boolean;
}

const BookUploadForm = () => {
  const router = useRouter();
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

  // Function to validate URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Fetch existing book data if ID exists
  useEffect(() => {
    const fetchBookData = async () => {
      if (id) {
        const bookRef = ref(database, "data/booksSection/" + id);
        const snapshot = await get(bookRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBookData(data);

          // Validate and set the preview URL
          if (data.bookLink && isValidUrl(data.bookLink)) {
            setPreview(data.bookLink); // Set the preview if it's a valid URL
          } else {
            console.error("Invalid URL for book cover:", data.bookLink);
            setPreview(null); // Clear preview if the URL is invalid
          }
        }
      }
    };

    fetchBookData();
  }, [id]);

  // Handle cover image drop
  const onDropCover = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setBookData((prev) => ({ ...prev, bookLink: file }));
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl); // Create a valid object URL
      setErrors((prev) => ({ ...prev, bookLink: "" })); // Clear error
    }
  };

  // Handle document drop
  const onDropDocument = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setBookData((prev) => ({ ...prev, bookDocument: file }));
      setErrors((prev) => ({ ...prev, bookDocument: "" })); // Clear error
    }
  };

  // Dropzone configurations
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

  // Validate form fields
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   alert("Please fill out all required fields.");
    //   return;
    // }

    try {
      const numericId = id || Date.now(); // Use the existing ID or generate a new one

      // Upload cover image
      let coverURL = "";
      if (bookData.bookLink) {
        const coverRef = storageRef(storage, `covers/${numericId}_${bookData.bookLink.name}`);
        await uploadBytes(coverRef, bookData.bookLink);
        coverURL = await getDownloadURL(coverRef); // Get the download URL
      }

      // Upload book document
      let documentURL = "";
      if (bookData.bookDocument) {
        const documentRef = storageRef(storage, `documents/${numericId}_${bookData.bookDocument.name}`);
        await uploadBytes(documentRef, bookData.bookDocument);
        documentURL = await getDownloadURL(documentRef); // Get the download URL
      }

      // Save book data to Firebase Realtime Database
      const bookRef = ref(database, "data/booksSection/" + numericId);
      await set(bookRef, {
        id: numericId,
        title: bookData.title,
        description: bookData.description,
        aboutBook: bookData.aboutBook,
        contributors: bookData.contributors,
        published: bookData.published,
        bookLink: coverURL, // Store the download URL, not the file object
        bookDocument: documentURL, // Store the download URL, not the file object
      });

      alert("Book data submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting book data:", error);
      alert("An error occurred while submitting the book data.");
    }
  };

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Reset form after submission
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
    setPreview(null); // Clear preview
    setErrors({});
  };

  return (
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
        <button type="submit" className="w-full bg-[#3ca0ca] text-white p-3 rounded-xl hover:bg-[#3ca0ca]">
          {id ? "Update Book" : "Upload Book"}
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
        <div className="border-4 border-dashed border-gray-400 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3ca0ca] transition">
          <label className="block text-xl font-medium text-gray-500">Book Document</label>
          <div {...getRootPropsDocument()} className="p-2 rounded-xl flex flex-col items-center justify-center cursor-pointer">
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
  );
};

export default BookUploadForm;