'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Star, X } from 'lucide-react';
import { database } from '@/app/firebase'; // Adjust path as necessary
import { ref, get, set } from 'firebase/database';
import emailjs from "@emailjs/browser";

interface Book {
    id: number;
    bookName: string;
    description: string;
    image: string;
    aboutBook: string;
    title: string;
    bookDescription: string;
    bookDocument: string;
    bookLink: string;
    published: boolean;
    contributors: string;
    rating: number;
}

const CustomCard = ({ book }: { book: Book }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [averageRating, setAverageRating] = useState<number>(0);

    useEffect(() => {
        setAverageRating(book?.rating ? Math.round(book.rating) : 5);
    }, [book]);

    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [modalOpen]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ email: event.target.value });
        setError(null);
        setSuccess(null);
    };

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
            // ✅ Use redirect page instead of direct PDF URL
            book_link: `https://www.drnimbs.com/read-book?bookDocument=${encodeURIComponent(book.bookDocument)}`,
            from_name: "Dr. Folarin",
            message: `Read ${book.title} online.`,
        };

        try {
            // Send email
            await emailjs.send(
                "service_pcg8s7k",
                "template_2pphbzh",
                templateParams,
                "zZljp-c12W6mwkno9"
            );

            // Save reader entry in Firebase
            const peopleReadEntry = {
                email: formData.email,
                date: new Date().toISOString(),
            };

            const bookRef = ref(database, `data/booksSection/${book.id}/peopleRead`);
            const snapshot = await get(bookRef);
            const peopleReadList = snapshot.exists() ? snapshot.val() : [];

            await set(bookRef, [...peopleReadList, peopleReadEntry]);

            // ✅ Redirect through /read-book for safe opening
            const redirectUrl = `https://www.drnimbs.com/read-book?bookDocument=${encodeURIComponent(book.bookDocument)}`;
            window.open(redirectUrl, "_blank");

            setFormData({ email: "" });
            setSuccess("Email sent successfully!");
        } catch (error) {
            console.error("Failed to send email:", error);
            setError("Error sending email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!book) {
        return <div className="text-red-500">Error: Book data is missing.</div>;
    }

    return (
        <div className="md:w-[90vw] lg:w-[60vw] md:h-fit min-h-[55vh] relative mx-auto bg-white shadow-md rounded-2xl p-6 hidden md:flex flex-row items-start space-x-6">
            {/* Image */}
            <Image
                src={book.bookLink}
                alt={book.title}
                width={400}
                height={200}
                className="!h-full !w-[50%] rounded-lg"
            />

            {/* Content Section */}
            <div className="flex flex-col items-start justify-start h-full gap-6 w-full">
                <h2 className="text-4xl capitalize font-semibold">{book.title}</h2>

                <p className="text-gray-600">{book.description}</p>

                {/* Ratings */}
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

                {/* Email Form */}
                <form className="flex gap-8 flex-1 w-full relative flex-col" onSubmit={handleSubmit}>
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

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        {book.published ? (
                            <button
                                disabled={loading}
                                type="submit"
                                className="px-8 py-3 bg-[#3ca0ca] text-white flex-1 rounded-lg hover:bg-[#2c7898] transition"
                            >
                                {loading ? "Sending..." : "Read for free"}
                            </button>
                        ) : (
                            <button
                                disabled
                                className="p-3 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex-1 flex items-center justify-center"
                            >
                                Coming Soon
                            </button>
                        )}

                        <button
                            onClick={() => setModalOpen(true)}
                            type="button"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            About the book
                        </button>
                    </div>
                </form>

                {/* Background decorative dots */}
                <div className="absolute -z-[1] -top-24 -left-24 md:grid hidden grid-cols-8 gap-4">
                    {[...Array(55)].map((_, i) => (
                        <span key={i} className="w-4 h-4 bg-gray-300 rounded-full"></span>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg relative">
                        <div className="bg-white p-6 rounded-lg md:max-w-[60vw] h-[50vh] overflow-scroll w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-bold">About the book</h2>
                                <a
                                    target="_blank"
                                    href={book.contributors}
                                    className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-700 transition-all"
                                >
                                    Read newsletter <ChevronRight />
                                </a>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">{book.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: book.aboutBook }}></div>

                            <button
                                onClick={() => setModalOpen(false)}
                                className="h-12 absolute text-black -top-14 -right-14 aspect-square border border-gray-400 flex items-center justify-center bg-white rounded-full hover:bg-gray-400 hover:text-white transition"
                            >
                                <X />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomCard;
