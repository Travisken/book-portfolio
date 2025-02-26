import { useState, useEffect } from "react";
import { database } from '@/app/firebase';
import { ref, update, remove, get } from 'firebase/database';
import { CheckCircle, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Testimonial {
  id: string;
  fullName: string;
  review: string;
  rating: number;
  approved: boolean;
  bookName: string;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = ref(database, 'data/testimonials');
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const testimonialArray: Testimonial[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTestimonials(testimonialArray);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        toast.error("Failed to fetch testimonials.");
        console.log(error)
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleApprove = async (id: string) => {
    const approvedCount = testimonials.filter((t) => t.approved).length;

    if (approvedCount >= 3) {
      toast.warning("You can only approve up to three testimonials.");
      return;
    }

    try {
      const testimonialRef = ref(database, `data/testimonials/${id}`);
      await update(testimonialRef, { approved: true });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
      );
      toast.success("Testimonial approved successfully!");
    } catch (err) {
      console.log(err)
      toast.error("Failed to approve testimonial.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const testimonialRef = ref(database, `data/testimonials/${id}`);
      await remove(testimonialRef);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testimonial deleted successfully!");
    } catch (err) {
      console.log(err)
      toast.error("Failed to delete testimonial.");
    }
  };

  if (loading) return <p>Loading testimonials...</p>;

  const TestimonialCard = ({ testimonial, actions }: { testimonial: Testimonial; actions: React.ReactNode }) => (
    <div className="p-6 border md:w-[67vw] rounded-lg shadow-md bg-white mb-4">
      <p className="font-semibold text-lg">{testimonial.fullName}</p>
      <p className="font-semibold text-zinc-500 text-md">{testimonial.bookName}</p>
      <p className="text-gray-600 my-2">&quot;{testimonial.review}&quot;</p>
      <p className="text-yellow-500">Rating: {testimonial.rating} ⭐</p>
      <div className="mt-4 flex space-x-4">{actions}</div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 h-fit">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Testimonials</h2>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Published Testimonials</h3>
        {testimonials.filter((t) => t.approved).length === 0 ? (
          <p className="text-gray-500">No published testimonials.</p>
        ) : (
          testimonials
            .filter((t) => t.approved)
            .map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                actions={(
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    <Trash2 className="mr-2" /> Delete
                  </button>
                )}
              />
            ))
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Pending Approval</h3>
        {testimonials.filter((t) => !t.approved).length === 0 ? (
          <p className="text-gray-500">No pending testimonials.</p>
        ) : (
          testimonials
            .filter((t) => !t.approved)
            .map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                actions={(
                  <>
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      <CheckCircle className="mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="mr-2" /> Delete
                    </button>
                  </>
                )}
              />
            ))
        )}
      </section>
    </div>
  );
}
