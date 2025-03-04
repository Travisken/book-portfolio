// import Image from "next/image";

import { Star } from "lucide-react";


interface TestimonialProps {
  fullName: string;
  review: string;
  rating: number;
  bookName: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ fullName, review, rating, bookName }) => {
  return (

    <>

      <div className="bg-white w-full md:max-w-[26rem] md:shadow-lg border md:border-none rounded-2xl p-6 max-w-md transition-all duration-300 hover:scale-105 ">
        <div className="flex items-center space-x-4 ">
          <div className="border-2 border-gray-300 w-14 h-14 flex-shrink-0 flex rounded-full "></div>
          {/* <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-300" /> */}
          <div>
            <h3 className="text-lg font-semibold whitespace-normal break-words">{fullName}</h3>
            <p className="text-sm text-gray-500">{bookName}</p>
          </div>
        </div>

        <p className="text-gray-700 mt-4 italic line-clamp-4 whitespace-normal break-words">
        &quot;{review}&quot;
        </p>


        <div className="flex items-center mt-4">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className={`w-5 h-5 ${index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
      </div>

    </>
  );
};

export default TestimonialCard;
