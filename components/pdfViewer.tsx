"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Dynamically import react-pdf to avoid SSR issues
const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false });

// ✅ Set the worker source correctly
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

export default function DocumentReader() {
  const file=("/sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);

  return (

    <>
    <div className="p-4 w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      {file && file.endsWith(".pdf") ? (
        <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} className="border mb-2" />
          ))}
        </Document>
      ) : (
        <p className="text-gray-500">No file available</p>
      )}
    </div>
    </>
    
  );
}
