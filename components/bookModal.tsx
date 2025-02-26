"use client";

import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Star } from "lucide-react";
import { database } from '@/app/firebase'; // Adjust path as necessary
import { ref, get, set } from 'firebase/database';
import { useRouter } from "next/navigation";

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
    peopleRead?: { email: string; date: string }[]; // Optional array for storing emails and dates
}

interface BookModalProps {
    open: boolean;
    onClose: () => void;
    book?: Book;
}

const modalStyle = {
    position: "absolute",
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
    const router = useRouter();

    useEffect(() => {
        const fetchTestimonials = async () => {
            if (!book) return; // Ensure book is defined

            try {
                const testimonialsRef = ref(database, 'data/testimonials');
                const snapshot = await get(testimonialsRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const testimonials: Testimonial[] = Object.keys(data).map((key) => ({
                        bookName: data[key].bookName,
                        rating: data[key].rating,
                    }));

                    // Filter testimonials for the current book
                    const filteredTestimonials = testimonials.filter(
                        (testimonial) => testimonial.bookName === book.title
                    );

                    // Calculate average rating
                    if (filteredTestimonials.length > 0) {
                        const totalRating = filteredTestimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0);
                        const avgRating = totalRating / filteredTestimonials.length;
                        setAverageRating(avgRating);
                    } else {
                        setAverageRating(0);
                    }
                } else {
                    console.log('No testimonials found');
                    setAverageRating(0);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };

        fetchTestimonials();
    }, [book]);

    const handleReadNow = () => {
        if (book?.bookLink) {
            router.push(`/pdf-viewer?bookDocument=${encodeURIComponent(book.bookDocument)}`);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ email: event.target.value });
        setError(null);
        setSuccess(null);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
            user_email: formData.email,
            book_title: book.title,
            book_link: book.bookLink,
        };
    
        try {
            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
    
            console.log("Email sent successfully:", response);
            setSuccess("Email sent! Check your inbox.");
    
            // Create the new entry for peopleRead
            const peopleReadEntry = {
                email: formData.email,
                date: new Date().toISOString(), // Store current date
            };
    
            // Reference to the book's peopleRead
            const bookRef = ref(database, `data/booksSection/${book.id}/peopleRead`);
    
            // Fetch existing peopleRead data
            const snapshot = await get(bookRef);
            let peopleReadList = snapshot.exists() ? snapshot.val() : [];
    
            // Append the new entry
            peopleReadList = [...peopleReadList, peopleReadEntry];
    
            // Update the database with the new peopleRead list
            await set(bookRef, peopleReadList);
    
            handleReadNow();
            setFormData({ email: "" });
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
                <Box sx={modalStyle} className="w-full max-w-2xl p-5 md:p-6 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        className="relative w-full min-h-48 h-full md:h-full rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${book.bookLink})` }}
                    ></div>

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
                                {success && <p className="text-green-500 top-[3rem] absolute text-sm">{success}</p>}
                                <Button
                                    variant="contained"
                                    className="mt-4 !py-3 !rounded-xl !bg-[#3ca0ce] hover:!bg-[#135690]"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Read now"}
                                </Button>
                            </form>

                            <div className="flex flex-col mt-2 items-start">
                                <p className="text-xl">Rating</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-5 h-5 ${index < averageRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="flex flex-col w-full">
                        <h3 className="py-3 text-3xl font-semibold">About this book</h3>
                        <h2 className="text-xl font-bold text-left text-gray-800 mb-4">{book.title}</h2>
                        <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: book.aboutBook }} />
                    </section>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookModal;