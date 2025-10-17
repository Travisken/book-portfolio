"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmailTable from "@/components/EmailTable";
import TestimonialManager from "@/components/TestimonialManager";
import BookTable from "@/components/BookTable";

export default function Dashboard() {
  const [downloadCount, setDownloadCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [emailCount, setEmailCount] = useState(0); // ✅ track number of emails
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // ✅ Fetch download count from API once user is authenticated
  useEffect(() => {
    if (!loading) {
      axios
        .get("/api/analytics")
        .then((res) => setDownloadCount(res.data.downloadCount))
        .catch((err) => console.error("Failed to fetch analytics:", err));
    }
  }, [loading]);

  // ✅ Fetch books from API
  useEffect(() => {
    if (!loading) {
      axios
        .get("/api/books")
        .then((res) => setBooks(res.data.books))
        .catch((err) => console.error("Failed to fetch books:", err));
    }
  }, [loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="md:p-6 p-2">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      {/* ✅ Emails Section */}
      <div className="bg-white md:p-6 p-2 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Submitted Emails</h2>
          <span className="text-gray-600 text-sm">
            Total: {emailCount}
          </span>
        </div>
        <EmailTable onEmailCountChange={setEmailCount} />
      </div>

      {/* ✅ Testimonials Section */}
      <div className="bg-white md:p-6 p-2 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Testimonials</h2>
        <TestimonialManager />
      </div>

      {/* ✅ Books Section */}
      <div className="bg-white md:p-6 p-2 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Added Books</h2>
          <span className="text-gray-600 text-sm">
            Total: {books.length}
          </span>
        </div>
        <BookTable />
      </div>
    </div>
  );
}
