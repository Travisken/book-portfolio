"use client";

import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import TestimonialCard from "./testimonialCard";
import testimonialData from "@/public/data.json";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Star } from "lucide-react";

interface BookModalProps {
    open: boolean;
    onClose: () => void;
    book: {
        title: string;
        description: string;
        image: string;
        buyLink: string;
        rating: number;

    } | null;
}




// interface TestimonialProps {
//     name: string;
//     review: string;
//     rating: number;
//   }

type Testimonial = {
    id: number;
    name: string;
    review: string;
};

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
    overflowY: "auto"
};

const BookModal: React.FC<BookModalProps> = ({ open, onClose, book }) => {
    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

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
            book_link: book.buyLink,
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
                        <div className="relative w-full min-h-48 h-full md:h-[22rem] rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${book.image})` }}>
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
                                            className={`w-5 h-5 ${index < (book?.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>

                            </div>

                        </div>


                    </div>
                    <section className="flex flex-col w-full">
                        <h3 className="py-3 text-3xl font-semibold">
                            About this book
                        </h3>
                        <h2 className="text-xl font-bold text-left text-gray-800 mb-4">
            Unlocking Investment Opportunities in Global Healthcare
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
            This book serves as a comprehensive guide to investment opportunities in the 
            <span className="font-semibold text-[#3ca0ce] mx-1">global health sector</span>. 
            Recognizing that governments alone cannot address all the challenges facing healthcare systems worldwide, 
            I aim to encourage healthcare professionals, investors, and entrepreneurs to take an active role in shaping the future of healthcare 
            in their respective countries.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
            Healthcare is a rapidly evolving field with numerous gaps that require innovative solutions. 
            From <span className="font-semibold text-[#3ca0ce] mx-1">infrastructure development</span> and 
            <span className="font-semibold text-[#3ca0ce] mx-1">medical technology</span> 
            to <span className="font-semibold text-[#3ca0ce] mx-1">telemedicine</span> and 
            <span className="font-semibold text-[#3ca0ce] mx-1">specialized care services</span>, 
            vast opportunities exist for professionals and investors to create impactful change. 
            Rather than relying solely on public health interventions, private sector involvement and strategic investments 
            can drive efficiency, accessibility, and improved patient outcomes.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
            Drawing from my experience as an <span className="font-semibold text-[#3ca0ce] mx-1">MBA student</span> 
            with a keen interest in healthcare business models and market dynamics, 
            I have curated key areas where healthcare personnel and investors can contribute meaningfully. 
            This book outlines various opportunities where individuals can leverage their expertise, capital, and innovation 
            to address pressing healthcare challenges.
        </p>

        <p className="text-gray-700 leading-relaxed">
            Ultimately, my goal is to ignite conversations and empower professionals to see beyond their clinical or academic roles—
            encouraging them to take on entrepreneurial and investment-driven initiatives. These efforts not only improve healthcare delivery 
            but also contribute to economic growth and sustainability in the industry. 
            I hope to provide readers with actionable insights and a fresh perspective on how they can play a role in 
            transforming healthcare, whether in their local communities or on a global scale.
        </p>
                        </section>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookModal;
