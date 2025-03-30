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
  isExpanded,
  onToggle,
}) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    if (fullName.includes("Will Katz")) {
      const parts = fullName.split(", ");
      setName(parts[0]); // First part as name
      setTitle(parts.slice(1).join(", ")); // Remaining parts as title
      setUserProfile("https://www.drnimbs.com/willkatz.JPG"); // Replace with actual image URL
    } else {
      setName(fullName);
      setTitle("");
      setUserProfile(null);
    }
  }, [fullName]);

  return (
    <div
      className={`bg-white flex flex-col gap-4 text-center mx-auto border md:shadow-lg rounded-2xl p-2 md:p-6 transition-all duration-500 ease-in-out 
        ${isExpanded ? "w-[100%] md:w-[50vw] z-10 scale-100" : "w-[100%] md:w-[32%] scale-100"}
        ${isExpanded ? "" : "h-auto md:h-[24rem] overflow-hidden"}`}
      onClick={onToggle}
    >
      <p className={`text-gray-700 mt-4 italic ${isExpanded ? "" : "line-clamp-3"}`}>
        &quot;{review}&quot;
      </p>

      <div className="flex items-center justify-center mt-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold whitespace-normal break-words">{name}</h3>
        {title && <p className="text-base font-medium text-gray-600">{title}</p>}

        {/* User Profile Image or First Letter */}
        {userProfile ? (
          <div className="border-2 mt-4 text-center flex items-center justify-center border-gray-300 font-semibold w-24 h-24 flex-shrink-0 rounded-full overflow-hidden">
            <img src={userProfile} alt={name} className="w-full h-full object-cover rounded-full" />
          </div>
        ) : (

          <div className="border-2 mt-4 text-center shadow-inner flex items-center justify-center border-gray-300 text-gray-300 text-2xl font-semibold w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
            <p className="text-gray-500 font-light text-3xl">{fullName.charAt(0).toUpperCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
