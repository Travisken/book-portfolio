import BookUploadForm from "@/components/addBookForm"
import { Suspense } from "react"


export default function AddBook(){
    return(
        <>
       
        <Suspense fallback={<p className="text-center">Loading...</p>}>
        <BookUploadForm/>
        </Suspense>
         </>
    )
}