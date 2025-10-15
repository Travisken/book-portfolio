"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReadBook() {
  const searchParams = useSearchParams();
  const bookDocument = searchParams.get("bookDocument");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!bookDocument) return;

    try {
      const decoded = bookDocument.includes("%")
        ? decodeURIComponent(bookDocument)
        : bookDocument;

      let finalUrl = decoded;

      // ✅ Convert Dropbox share links to inline-friendly versions
      if (decoded.includes("dropbox.com")) {
        finalUrl = decoded
          .replace("www.dropbox.com", "dl.dropboxusercontent.com")
          .replace("?dl=0", "")
          .replace("?dl=1", "")
          .replace("?raw=1", "");
      } else if (!decoded.startsWith("http")) {
        finalUrl = `https://www.drnimbs.com/${decoded.replace(/^\/+/, "")}`;
      }

      setPdfUrl(finalUrl);
    } catch (err) {
      console.error("Invalid bookDocument link:", err);
      setError(true);
    }
  }, [bookDocument]);

  if (error || !bookDocument) {
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

  if (!pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600 text-lg">
        <p className="text-xl font-medium mb-2">Preparing your book...</p>
        <p className="text-gray-500 text-sm">Please wait a moment.</p>
      </div>
    );
  }

  // ✅ Show the PDF inline
  return (
    <div className="w-screen h-screen bg-gray-100">
      <iframe
        src={pdfUrl}
        className="w-full h-full border-none"
        allow="fullscreen"
        title="Book Viewer"
      />
    </div>
  );
}
