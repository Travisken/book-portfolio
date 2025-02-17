import Image from "next/image";

interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  buyLink: string;
  published: boolean;
}

interface BookProps {
  book: Book;
  onReadMore: (book: Book) => void;
}


const BookCard: React.FC<BookProps> = ({ book, onReadMore }) => {
  return (
    <div className="shadow rounded-xl p-2 flex flex-col md:w-[18rem] flex-1 gap-4">
      {/* Image Section */}
      <div className="relative h-52 rounded-xl overflow-hidden">
        <Image 
          src={book.image} 
          alt={book.title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-xl">{book.title}</h3>
        <p className="text-zinc-600 line-clamp-3">{book.description}</p>
        
        {/* Conditional Button */}
        {book.published ? (
          <button 
            onClick={() => onReadMore(book)} 
            className="p-2 rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex-1 flex md:w-1/2 items-center justify-center"
          >
            Read more
          </button>
        ) : (
          <button 
            disabled 
            className="p-2 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex-1 flex md:w-1/2 items-center justify-center"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
