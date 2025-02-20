import { ChangeEvent, FormEvent, useState } from 'react';
import { FaStar } from 'react-icons/fa';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <section className="md:px-20 px-4">
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
                  className={`cursor-pointer text-2xl ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
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
