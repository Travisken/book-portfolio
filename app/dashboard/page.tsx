"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/firebase"; // Adjust the path as necessary
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmailTable from "@/components/EmailTable";
import TestimonialManager from "@/components/TestimonialManager";
import BookTable from "@/components/BookTable";

export default function Dashboard() {
  const [downloadCount, setDownloadCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setLoading(false); // Set loading to false if authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  // Fetch download count from the API
  useEffect(() => {
    if (!loading) {
      axios.get("/api/analytics").then((res) => {
        setDownloadCount(res.data.downloadCount);
        console.log(res.data.downloadCount);
        console.log(downloadCount)
      });
    }
  }, [loading, downloadCount, books]);

  // Fetch books from the API
  useEffect(() => {
    if (!loading) {
      axios.get("/api/books").then((res) => {
        setBooks(res.data.books);
        console.log(res.data.books);
        console.log(books)
      });
    }
  }, [loading]);

  if (loading) return <p>Loading...</p>; // Show loading state

  return (
    <div className="md:p-6 p-2">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      {/* Emails Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Submitted Emails</h2>
        <EmailTable />
      </div>

      {/* Testimonials Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Testimonials</h2>
        <TestimonialManager />
      </div>

      {/* Partners Section */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Partners</h2>
      </div> */}

      {/* Books Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Added Books</h2>
        <BookTable />
      </div>
    </div>
  );
}