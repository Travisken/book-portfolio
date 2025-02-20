"use client";

import { useSearchParams } from "next/navigation";

const PdfViewer = () => {
    const searchParams = useSearchParams();
    const bookDocument = searchParams.get("bookDocument");

    if (!bookDocument) {
        return <p className="text-center text-red-500">No book link provided.</p>;
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <iframe
                src={bookDocument}
                className="w-full h-full"
                allowFullScreen
            />
        </div>
    );
};

export default PdfViewer;
