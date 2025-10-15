"use client";

import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Star, X } from "lucide-react";
import { database } from "@/app/firebase";
import { ref, get, set } from "firebase/database";

interface Testimonial {
  bookName: string;
  rating: number;
}

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  bookDocument: string;
  aboutBook: string;
  bookLink: string;
  published: boolean;
  peopleRead?: { email: string; date: string }[];
}

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book?: Book;
}

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  outline: "none",
  p: 3,
  width: "90vw",
  maxWidth: "800px",
  maxHeight: "90vh",
  overflowY: "auto",
};

const BookModal: React.FC<BookModalProps> = ({ open, onClose, book }) => {
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!book) return;

      try {
        const testimonialsRef = ref(database, "data/testimonials");
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const testimonials: Testimonial[] = Object.values(data);
          const filtered = testimonials.filter((t) => t.bookName === book.title);

          if (filtered.length > 0) {
            const totalRating = filtered.reduce((acc, t) => acc + t.rating, 0);
            setAverageRating(totalRating / filtered.length);
          } else {
            setAverageRating(0);
          }
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [book]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: event.target.value });
    setError(null);
    setSuccess(null);
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /** ✅ Redirect through the `/read-book` viewer instead of Dropbox directly */
  const openBookDocument = (rawUrl: string) => {
    if (!rawUrl) {
      setError("Book link is missing or invalid.");
      return;
    }

    try {
      const decoded = rawUrl.includes("%") ? decodeURIComponent(rawUrl) : rawUrl;

      const viewerUrl = `/read-book?bookDocument=${encodeURIComponent(decoded)}`;

      // Open in a new tab (no Dropbox download)
      window.open(viewerUrl, "_blank");
    } catch (err) {
      console.error("Failed to open book document:", err);
      setError("Could not open the document. Please try again.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!book) {
      setError("Book details are missing.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const templateParams = {
      to_email: formData.email,
      book_title: book.title,
      book_link: `https://www.drnimbs.com/read-book?bookDocument=${encodeURIComponent(
        book.bookDocument
      )}`,
      from_name: "Dr. Folarin",
      reply_to: formData.email,
    };

    try {
      await emailjs.send(
        "service_pcg8s7k",
        "template_2pphbzh",
        templateParams,
        "zZljp-c12W6mwkno9"
      );

      const entry = { email: formData.email, date: new Date().toISOString() };

      const bookRef = ref(database, `data/booksSection/${book.id}/peopleRead`);
      const snapshot = await get(bookRef);
      const list = snapshot.exists() ? snapshot.val() : [];

      await set(bookRef, [...list, entry]);

      // ✅ Use /read-book viewer (no Dropbox download)
      openBookDocument(book.bookDocument);

      setFormData({ email: "" });
      setSuccess("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      setError("Error sending email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box className="relative">
          <button
            className="absolute md:top-4 md:right-4 -top-0 bg-transparent border-none p-2 rounded-full cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <Box sx={modalStyle} className="relative p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="relative w-full min-h-48 h-full rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${book.bookLink})` }}
              />

              <div className="flex flex-col gap-4">
                <Typography variant="h4" component="h2" className="font-semibold">
                  {book.title}
                </Typography>

                <h5 className="text-lg font-semibold">Description</h5>
                <Typography className="text-zinc-600">{book.description}</Typography>

                <form className="flex relative flex-col gap-6" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-[#3ca0ce]"
                    required
                  />
                  {error && <p className="text-red-500 bottom-0 absolute text-sm">{error}</p>}
                  {success && (
                    <p className="text-green-500 top-[3rem] absolute text-sm">{success}</p>
                  )}

                  {book.published ? (
                    <Button
                      variant="contained"
                      className="mt-4 !py-3 !rounded-xl !bg-[#3ca0ce] !shadow-none hover:!bg-[#135690]"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Read for free"}
                    </Button>
                  ) : (
                    <button
                      disabled
                      className="p-3 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex items-center justify-center"
                    >
                      Coming Soon
                    </button>
                  )}
                </form>

                <div className="flex flex-col mt-2 items-start">
                  <p className="text-xl">Rating</p>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < averageRating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section className="flex flex-col w-full mt-6">
              <h3 className="py-3 text-3xl font-semibold">About this book</h3>
              <h2 className="text-xl font-bold text-left text-gray-800 mb-4">
                {book.title}
              </h2>
              <p
                className="text-gray-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: book.aboutBook }}
              />
            </section>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookModal;
