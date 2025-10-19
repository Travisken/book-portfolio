"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { database } from "@/app/firebase";
import { ref, push, get } from "firebase/database";
//import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "./selectInput";
import { motion, useAnimation, useInView } from "framer-motion";

interface Book {
  id: number;
  bookName: string;
  description: string;
  image: string;
  aboutBook: string;
  title: string;
  bookDescription: string;
  bookLink: string;
  published: boolean;
  rating: number;
}

export default function TestimonialForm() {
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    review: "",
    title: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Animation setup
  const refSection = useRef(null);
  const isInView = useInView(refSection, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // 🔹 Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = ref(database, "data");
        const snapshot = await get(booksRef);
        if (snapshot.exists()) {
          const bookData = snapshot.val();
          const loadedBooks: Book[] = Object.keys(bookData.booksSection).map(
            (key) => ({
              id: parseInt(key),
              ...bookData.booksSection[key],
            })
          );
          setBooks(loadedBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSelectChange = (title: string) => {
    setFormData((prev) => ({ ...prev, title }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const testimonialsRef = ref(database, "data/testimonials");
      await push(testimonialsRef, {
        ...formData,
        approved: false,
        createdAt: new Date().toISOString(),
      });

      //const templateParams = {
        //from_name: formData.fullName,
        //to_email: formData.email,
        //message:
          //`New feedback received from ${formData.fullName} (${formData.email}):\n\n` +
        //  `Book Name: ${formData.title}\n` +
        //  `Review: ${formData.review}\n` +
          //`Rating: ${formData.rating}`,
    //  };

      //await emailjs.send(
      //  "service_3pbn9c7", 
         //  "template_f4aecqk",
           //templateParams,
         //  "ctYtI2h1sBjCxXBpC"
     // );

      toast.success("Thank you for your feedback! Your testimonial is pending approval.");

      setFormData({
        fullName: "",
        email: "",
        review: "",
        title: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      toast.error("There was an error submitting your feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      ref={refSection}
      id="testimonialForm"
      className="md:px-20 px-4"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      <ToastContainer />
      <motion.div
        className="md:p-10 p-4 rounded-2xl bg-[#00000015] flex-1"
        variants={sectionVariants}
      >
        <div className="flex flex-col gap-2 py-6">
          <h2 className="text-4xl font-bold">Feedback</h2>
          <p className="text-sm text-zinc-500">
            Share your thoughts and help improve future books with your valuable feedback!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg focus:outline-[#3ca0ce]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg focus:outline-[#3ca0ce]"
            required
          />

          <SelectInput books={books} onChange={handleSelectChange} />

          <textarea
            name="review"
            placeholder="Write your review..."
            value={formData.review}
            onChange={handleChange}
            className="w-full p-3 rounded-lg h-24 focus:outline-[#3ca0ce]"
            required
          ></textarea>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Rating:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer hover:text-gray-400 transition-all duration-300 text-2xl ${
                    formData.rating >= star
                      ? "text-yellow-400 hover:text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="md:w-[12rem] w-full font-semibold bg-[#3ca0ce] text-white p-3 rounded-lg hover:bg-[#135690] transition-all duration-500"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </motion.section>
  );
}
