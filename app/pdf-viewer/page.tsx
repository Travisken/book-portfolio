"use client";

import dynamic from "next/dynamic";

// Dynamically import PdfViewer with SSR disabled
const PdfViewer = dynamic(() => import("@/components/pdfViewer"), { ssr: false });

const BookPage = () => {
  return <PdfViewer fileUrl="/sample.pdf" />;
};

export default BookPage;
