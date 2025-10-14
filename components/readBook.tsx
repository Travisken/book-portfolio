"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReadBook() {
  const searchParams = useSearchParams();
  const bookDocument = searchParams.get("bookDocument");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!bookDocument) return;

    try {
      console.log("Raw bookDocument param:", bookDocument);

      // Handle both encoded and unencoded URLs
      const decoded = bookDocument.includes("%")
        ? decodeURIComponent(bookDocument)
        : bookDocument;

      // Handle relative paths (e.g. "/books/book.pdf" or "book.pdf")
      const finalUrl =
        decoded.startsWith("http") || decoded.startsWith("https")
          ? decoded
          : `https://www.drnimbs.com/${decoded.replace(/^\/+/, "")}`;

      console.log("Redirecting to:", finalUrl);

      // Attempt redirect
      window.location.href = finalUrl;

      // Optional: set timeout to show error if redirect fails
      const timeout = setTimeout(() => setError(true), 7000);
      return () => clearTimeout(timeout);
    } catch (err) {
      console.error("Invalid bookDocument link:", err);
      setError(true);
    }
  }, [bookDocument]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700 text-lg text-center px-6">
        <p className="mb-3 font-semibold text-2xl">⚠️ Unable to open your book</p>
        <p className="text-gray-600 max-w-md">
          There was an issue loading the document. Please check the link or try again later.
        </p>
        {bookDocument && (
          <p className="mt-4 text-sm text-gray-400 break-all">
            Provided link: <span className="font-mono">{bookDocument}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 text-lg">
      <p className="text-xl font-medium mb-2">Redirecting to your book...</p>
      <p className="text-gray-500 text-sm">If nothing happens, please check your browser popup settings.</p>
    </div>
  );
}
