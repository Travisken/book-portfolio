import { ChangeEvent, FormEvent, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { database } from '@/app/firebase'; // Import the Realtime Database instance
import { ref, push } from "firebase/database"; // Import Realtime Database functions
import emailjs from 'emailjs-com'; // Import EmailJS

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    review: "",
    bookName: "",
    rating: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Push the form data to the "data/testimonials" node in Realtime Database
      const testimonialsRef = ref(database, "data/testimonials");
      await push(testimonialsRef, {
        fullName: formData.fullName,
        email: formData.email,
        review: formData.review,
        bookName: formData.bookName,
        rating: formData.rating,
        approved: false, // Set approved to false by default
        createdAt: new Date().toISOString() // Add a timestamp
      });

      // Send email notification
      const templateParams = {
        from_name: formData.fullName,
        to_name: 'Angolo Isaac',
        message: `New feedback received from ${formData.fullName} (${formData.email}):\n\n` +
                  `Book Name: ${formData.bookName}\n` +
                  `Review: ${formData.review}\n` +
                  `Rating: ${formData.rating}`
      };

      await emailjs.send('service_56znazp', 'template_22kln5n', templateParams, 'whMJPH_AhXYVn1L1U');

      alert("Thank you for your feedback! Your testimonial is pending approval.");

      // Clear the form after submission
      setFormData({
        fullName: "",
        email: "",
        review: "",
        bookName: "",
        rating: 0
      });

    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  return (
    <section id='testimonialForm' className="md:px-20 px-4">
      <div className="md:p-10 p-4 rounded-2xl bg-[#00000015] flex-1">
        <div className="flex flex-col gap-2 py-6">
          <h2 className="text-4xl font-bold">Feedback</h2>
          <p className="text-sm text-zinc-500">Share your thoughts and help improve future books with your valuable feedback!</p>
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
          <input
            type="text"
            name="bookName"
            placeholder="Book Name"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg focus:outline-[#3ca0ce]"
            required
          />
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
                  className={`cursor-pointer hover:text-gray-400 transition-all duration-300 text-2xl ${formData.rating >= star ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="md:w-[12rem] w-full font-semibold bg-[#3ca0ce] text-white p-3 rounded-lg hover:bg-[#135690] transition-all duration-500"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}