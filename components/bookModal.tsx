"use client";

import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import TestimonialCard from "./testimonialCard";
import testimonialData from "@/public/data.json";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface BookModalProps {
    open: boolean;
    onClose: () => void;
    book: {
        title: string;
        description: string;
        image: string;
        buyLink: string;
    } | null;
}

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
                        <div className="relative w-full h-48 md:h-72 rounded-lg bg-cover bg-center" 
                            style={{ backgroundImage: `url(${book.image})` }}>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Typography variant="h4" component="h2" className="font-semibold">
                                {book.title}
                            </Typography>
                            <h5 className="text-lg font-semibold">Description</h5>
                            <Typography className="text-zinc-600">{book.description}</Typography>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-[#3ca0ce]"
                            required
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}
                        <Button
                            variant="contained"
                            className="mt-4 py-3 rounded-lg bg-[#3ca0ce] hover:bg-[#135690]"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Read now"}
                        </Button>
                    </form>
                        </div>
                    </div>
                    
                    <div className="flex flex-1 max-w-[23rem] flex-col gap-4">
                        {testimonialData.testimonials
                            .filter((testimonial: Testimonial) => testimonial.id === 3)
                            .map((testimonial) => (
                                <TestimonialCard key={testimonial.id} {...testimonial} />
                            ))}
                    </div>
                    
                    
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookModal;
