import BookUploadForm from "@/components/addBookForm"
import { Suspense } from "react"


export default function AddBook(){
    return(
        <>
        <h2 className="font-semibold text-3xl pb-4">
            Add Book
        </h2>
        <Suspense fallback={<p className="text-center">Loading...</p>}>
        <BookUploadForm/>
        </Suspense>
         </>
    )
}