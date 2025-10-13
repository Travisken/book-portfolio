"use client";

import ReadBook from "@/components/readBook";
import { Suspense } from "react";

const ReadBookPage = () => {
  return (
  <>  
  <Suspense fallback={<p className="text-center">Loading PDF...</p>}>
  <ReadBook />
  </Suspense>
  </>
);
};

export default ReadBookPage;
