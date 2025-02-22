"use client";

import PdfViewer from "@/components/pdfViewer";
import { Suspense } from "react";

const BookPage = () => {
  return (
  <>  
  <Suspense fallback={<p className="text-center">Loading PDF...</p>}>
  <PdfViewer />
  </Suspense>
  </>
);
};

export default BookPage;
