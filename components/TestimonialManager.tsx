import { useState, useEffect } from "react";
import { database } from '@/app/firebase'; // Adjust the path as necessary
import { ref, update, remove, get } from 'firebase/database';

interface Testimonial {
  id: string; // Use string for Firebase-generated keys
  fullName: string;
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
        const testimonialsRef = ref(database, 'data/testimonials'); // Adjust the path based on your structure
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const testimonialArray: Testimonial[] = Object.keys(data).map((key) => ({
            id: key, // Use Firebase-generated key as ID
            ...data[key], // Spread the testimonial data
          }));
          console.log('Testimonials array:', testimonialArray); // Log testimonials array
          setTestimonials(testimonialArray);
        } else {
          console.log('No testimonials found');
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Failed to fetch testimonials.");
        setTestimonials([]);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchTestimonials();
  }, []);

  // Handle approving a testimonial
  const handleApprove = async (id: string) => {
    const approvedCount = testimonials.filter((t) => t.approved).length;

    if (approvedCount >= 3) {
      setError("You can only approve up to three testimonials.");
      return;
    }

    try {
      const testimonialRef = ref(database, `data/testimonials/${id}`); // Adjust the path based on your structure
      await update(testimonialRef, { approved: true }); // Update the approved status in Firebase
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
      );
      setError(null); // Clear error if successful
    } catch (err) {
      console.error("Failed to approve testimonial:", err);
      setError("Failed to approve testimonial.");
    }
  };

  // Handle deleting a testimonial
  const handleDelete = async (id: string) => {
    try {
      const testimonialRef = ref(database, `data/testimonials/${id}`); // Adjust the path based on your structure
      console.log(`Deleting testimonial with ID: ${id}`); // Debug log
      await remove(testimonialRef); // Remove the testimonial from Firebase
      console.log(`Successfully deleted testimonial with ID: ${id}`); // Debug log
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
      setError("Failed to delete testimonial.");
    }
  };

  if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Testimonials</h2>

      {/* Approved Testimonials */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Published Testimonials</h3>
        {testimonials.filter((t) => t.approved).length === 0 ? (
          <p className="text-gray-500">No published testimonials.</p>
        ) : (
          testimonials
            .filter((t) => t.approved) // Filter for approved testimonials
            .map((testimonial) => (
              <div key={testimonial.id} className="p-4 border rounded mb-2">
                <p className="font-bold">{testimonial.fullName }</p>
                <p className="text-gray-600">&quot;{testimonial.review}&quot;</p>
                <p className="text-yellow-500">Rating: {testimonial.rating} ⭐</p>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Delete
                </button>
              </div>
            ))
        )}
      </div>

      {/* Pending Approval */}
      <div>
        <h3 className="text-lg font-medium">Pending Approval</h3>
        {testimonials.filter((t) => !t.approved).length === 0 ? (
          <p className="text-gray-500">No pending testimonials.</p>
        ) : (
          testimonials
            .filter((t) => !t.approved) // Filter for pending testimonials
            .map((testimonial) => (
              <div key={testimonial.id} className="p-4 border rounded mb-2">
                <p className="font-bold">{testimonial.fullName}</p>
                <p className="text-gray-600  whitespace-normal break-words">&quot;{testimonial.review}&quot;</p>
                <p className="text-yellow-500">Rating: {testimonial.rating} ⭐</p>
                <button
                  onClick={() => handleApprove(testimonial.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Delete
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}