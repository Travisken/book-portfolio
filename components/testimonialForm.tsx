import { useState } from "react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    review: "",
    bookName: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <>
      <section className="md:px-20">
        <div className="md:p-10 p-4 rounded-2xl bg-[#00000002]   flex-1">

          <div className="flex flex-col gap-2 py-6">
            <h2 className="text-4xl font-bold">
              Feedback
            </h2>
            <p className=" text-sm text-zinc-500">
              Submit your feedback.
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

            <button
              type="submit"
              className="md:w-[12rem] w-full font-semibold bg-[#3ca0ce] text-white p-3 rounded-lg hover:bg-[#135690] transition-all duration-500"
            >
              Submit
            </button>
          </form>
        </div>
      </section>


    </>
  )
}