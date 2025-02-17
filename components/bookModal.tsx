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
    // Add other properties as needed
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
        console.log(templateParams)

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
                <Box className="md:w-[70vw] w-[95%] md:p-4 flex md:items-center md:justify-center h-[70vh] overflow-scroll" sx={modalStyle}>
                    <div className="flex flex-wrap md:flex-nowrap p-2 overflow-scroll gap-10">
                        <div className="flex w-full flex-col gap-4">
                            <div
                                style={{
                                    backgroundImage: `url(${book.image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                className="bg-red-400 max-md:w-[100%] max-md:h-[10rem] h-72 rounded-lg"
                            ></div>

                            <h5 className="text-xl font-semibold">Description</h5>
                            <Typography className="text-zinc-600 mt-2 md:w-[400px]">{book.description}</Typography>
                        </div>

                        <div className="flex flex-wrap gap-10">
                            <Typography variant="h4" component="h2" className="font-semibold">
                                {book.title}
                            </Typography>

                            {testimonialData.testimonials
                                .filter((testimonial: Testimonial) => testimonial.id === 3)
                                .map((testimonial) => (
                                    <TestimonialCard key={testimonial.id} {...testimonial} />
                                ))}


                            <form className="w-full gap-4 flex flex-col" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-xl focus:outline-[#3ca0ce]"
                                    required
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                {success && <p className="text-green-500 text-sm">{success}</p>}

                                <Button
                                    variant="contained"
                                    className="mt-4 !py-3 !rounded-xl !bg-[#3ca0ce] hover:!bg-[#135690]"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Read now"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookModal;
