import { useState, useEffect } from "react";
import axios from "axios";

interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  approved: boolean;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get<Testimonial[]>("/api/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        setError("Failed to fetch testimonials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleApprove = async (id: number) => {
    const approvedCount = testimonials.filter((t) => t.approved).length;

    if (approvedCount >= 3) {
      setError("You can only approve up to three testimonials.");
      return;
    }

    try {
      await axios.post("/api/approve-testimonial", { id });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
      );
      setError(null); // Clear error if successful
    } catch (err) {
      setError("Failed to approve testimonial.");
    }
  };

  if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Testimonials</h2>

      {/* Approved Testimonials */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Approved Testimonials</h3>
        {testimonials.filter((t) => t.approved).length === 0 ? (
          <p className="text-gray-500">No approved testimonials.</p>
        ) : (
          testimonials
            .filter((t) => t.approved)
            .map((testimonial) => (
              <div key={testimonial.id} className="p-4 border rounded mb-2">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-gray-600">&quot;{testimonial.review}&quot;</p>
                <p className="text-yellow-500">Rating: {testimonial.rating} ⭐</p>
              </div>
            ))
        )}
      </div>

      {/* Unapproved Testimonials */}
      <div>
        <h3 className="text-lg font-medium">Pending Approval</h3>
        {testimonials.filter((t) => !t.approved).length === 0 ? (
          <p className="text-gray-500">No pending testimonials.</p>
        ) : (
          testimonials
            .filter((t) => !t.approved)
            .map((testimonial) => (
              <div key={testimonial.id} className="p-4 border rounded mb-2">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-gray-600">&quot;{testimonial.review}&quot;</p>
                <p className="text-yellow-500">Rating: {testimonial.rating} ⭐</p>
                <button
                  onClick={() => handleApprove(testimonial.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Approve
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
