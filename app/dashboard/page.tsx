"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import EmailTable from "@/components/EmailTable";
import TestimonialManager from "@/components/TestimonialManager";
// import AnalyticsChart from "@/components/AnalyticsChart";
// import DashboardNavbar from "@/components/DashboardNav";
// import Sidebar from "@/components/Sidebar";
import BookTable from "@/components/BookTable";
// import BookTable from "@/components/BookTable";

export default function Dashboard() {
  const [downloadCount, setDownloadCount] = useState(0);
  const [books, setBooks] = useState([]);

  // Fetch download count from the API
  useEffect(() => {
    axios.get("/api/analytics").then((res) => {
      setDownloadCount(res.data.downloadCount);
      console.log(downloadCount)
    });
  }, []);

  // Fetch books from the API
  useEffect(() => {
    axios.get("/api/books").then((res) => {
      setBooks(res.data.books);
      console.log(books)
    });
  }, []);

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
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Partners</h2>
      </div>

      {/* Books Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Added Books</h2>
        <BookTable />
      </div>
    </div>
  );
}
