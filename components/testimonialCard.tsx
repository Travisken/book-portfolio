import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface TestimonialProps {
  fullName: string;
  review: string;
  rating: number;
  bookName: string;
  email: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  fullName,
  review,
  rating,
  // bookName,
  email,
  isExpanded,
  onToggle,
}) => {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (fullName.includes("Will Katz")) {
      const parts = fullName.split(", ");
      setName(parts[0]); // First part as name
      setTitle(parts.slice(1).join(", ")); // Remaining parts as title
    } else {
      setName(fullName);
      setTitle("");
    }
  }, [fullName]);

  return (
    <div
      className={`bg-white flex flex-col gap-4 text-center mx-auto border md:shadow-lg rounded-2xl p-2 md:p-6  transition-all duration-500 ease-in-out 
        ${isExpanded ? "w-[100%] md:w-[50vw] z-10 scale-100" : "w-[100%] md:w-[32%] scale-100 opacity-70"}
        ${isExpanded ? "" : "h-auto md:h-[19rem] overflow-hidden"} `}
      onClick={onToggle}
    >
      <p className={`text-gray-700 mt-4 italic ${isExpanded ? "" : "line-clamp-3"}`}>
        &quot;{review}&quot;
      </p>

      {/* <button onClick={onToggle} className="text-blue-500 hover:underline">
        {isExpanded ? "See Less" : "See More"}
      </button> */}

      <div className="flex items-center justify-center mt-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold whitespace-normal break-words">{name}</h3>
        {title && <p className="text-base font-medium text-gray-600">{title}</p>}
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
