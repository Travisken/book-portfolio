"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ReadBook() {
  const searchParams = useSearchParams();
  const bookDocument = searchParams.get("bookDocument");

  useEffect(() => {
    if (bookDocument) {
      window.location.href = decodeURIComponent(bookDocument);
    }
  }, [bookDocument]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
      Redirecting to your book...
    </div>
  );
}
