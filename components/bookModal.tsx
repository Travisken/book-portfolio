import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Star, X } from "lucide-react";
import { database } from '@/app/firebase'; // Adjust path as necessary
import { ref, get, set } from 'firebase/database';
// import { useRouter } from "next/navigation";
// import Image from 'next/image';

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
    // const router = useRouter();

    useEffect(() => {
        const fetchTestimonials = async () => {
            if (!book) return;

            try {
                const testimonialsRef = ref(database, 'data/testimonials');
                const snapshot = await get(testimonialsRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const testimonials: Testimonial[] = Object.values(data);

                    const filteredTestimonials = testimonials.filter(
                        (testimonial) => testimonial.bookName === book.title
                    );

                    if (filteredTestimonials.length > 0) {
                        const totalRating = filteredTestimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0);
                        setAverageRating(totalRating / filteredTestimonials.length);
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

        // Ensure the templateParams includes the correct recipient email
        const templateParams = {
            to_email: formData.email, // Ensure this matches your EmailJS template
            book_title: book.title,
            book_link: `https://www.drnimbs.com/pdf-viewer?bookDocument=${encodeURIComponent(book.bookDocument)}`,
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

            const peopleReadEntry = {
                email: formData.email,
                date: new Date().toISOString(),
            };

            const bookRef = ref(database, `data/booksSection/${book.id}/peopleRead`);
            const snapshot = await get(bookRef);
            const peopleReadList = snapshot.exists() ? snapshot.val() : [];

            await set(bookRef, [...peopleReadList, peopleReadEntry]);

            // Open the pdf-viewer page in a new tab
            window.open(`/pdf-viewer?bookDocument=${encodeURIComponent(book.bookDocument)}`, "_blank");

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
        <>
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
                            className="absolute md:top-4 md:right-4 -top-4 bg-white right-0 bg-transparent border-none cursor-pointer"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    <Box sx={modalStyle} className="relative p-2 md:!top-[50%] !overflow-scroll !top-[50%] md:!max-h-[90vh] !max-h-[80vh] md:!p-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                className="relative w-full min-h-48 h-full md:h-full rounded-lg bg-cover bg-center"
                                style={{ backgroundImage: `url(${book.bookLink})`, backgroundSize: "cover" }}
                            >
                            </div>

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
                                

                                    {book.published ? (
                                        <Button
                                            variant="contained"
                                            className="mt-4 !py-3 !rounded-xl !bg-[#3ca0ce] !shadow-none hover:!bg-[#135690]"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Download for free"}
                                        </Button>
                                    ) : (
                                        <button
                                            disabled
                                            className="p-3 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex-1 flex items-center justify-center"
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
                    </Box>
                       
                </Fade>
            </Modal>
        </>
    );
};

export default BookModal;