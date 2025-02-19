import BookUploadForm from "@/components/addBookForm"


export default function AddBook(){
    return(
        <>
        <h2 className="font-semibold text-3xl pb-4">
            Add Book
        </h2>
        <BookUploadForm/>
         </>
    )
}