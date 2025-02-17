import Image from "next/image";

import { Star } from "lucide-react";

// interface TestimonialProps {
//   title: string;
//   description: string;
//   image: string;
//   buyLink: string;
// }

interface TestimonialProps {
    name: string;
    // role: string;
    review: string;
    // image: string;
    rating: number;
  }

const TestimonialCard: React.FC<TestimonialProps> = ({ name, review, rating }) => {
  return (
    // <div className="shadow-lg rounded-xl p-4 flex flex-col w-[18rem] gap-4 bg-white">
    //   <div className="h-52 rounded-xl overflow-hidden relative">
    //     <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-lg" />
    //   </div>

    //   <div className="flex flex-col gap-2">
    //     <h3 className="font-semibold text-xl">{title}</h3>
    //     <p className="text-zinc-600 text-sm">{description}</p>
    //     <a
    //       href={buyLink}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="p-2 rounded-xl font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex items-center justify-center"
    //     >
    //       Read more
    //     </a>
    //   </div>
    // </div>

    <>
    
    <div className="bg-white w-full md:w-[26rem] shadow-lg rounded-2xl p-6 max-w-md transition-all duration-300 hover:scale-105 ">
      <div className="flex items-center space-x-4 ">
        <div className="border-2 border-gray-300 w-14 h-14 rounded-full "></div>
        {/* <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-300" /> */}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          {/* <p className="text-sm text-gray-500">{role}</p> */}
        </div>
      </div>

      <p className="text-gray-700 mt-4 italic">"{review}"</p>

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
