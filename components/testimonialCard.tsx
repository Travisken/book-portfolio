"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface TestimonialCardProps {
  fullName: string;
  review: string;
  rating: number;
  bookName?: string;
  email?: string;
  profileImage?: string; // Optional: override image
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string; // for extra styling overrides
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  fullName,
  review,
  rating,
  profileImage,
  isExpanded = false,
  onToggle,
  className = "",
}) => {
  const [name, setName] = useState(fullName);
  const [title, setTitle] = useState("");
  const [userProfile, setUserProfile] = useState<string | null>(profileImage || null);

  // derive display name and optional title
  useEffect(() => {
    if (fullName.includes(",")) {
      const [personName, ...rest] = fullName.split(", ");
      setName(personName);
      setTitle(rest.join(", "));
    } else {
      setName(fullName);
      setTitle("");
    }

    // example: custom profile for a known name
    if (fullName.includes("Will Katz")) {
      setUserProfile("https://www.drnimbs.com/willkatz.JPG");
    }
  }, [fullName, profileImage]);

  return (
    <div
      onClick={onToggle}
      className={clsx(
        "bg-white flex w-full flex-col gap-4 text-center border rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm md:shadow-md transition-all duration-500 ease-in-out cursor-pointer",
        isExpanded
          ? " z-10 scale-100"
          : " h-auto md:h-[25rem] overflow-hidden",
        "hover:shadow-lg hover:scale-[1.02]",
        className
      )}
    >
      {/* Review text */}
      <p
        className={clsx(
          "text-gray-700 italic text-sm sm:text-base md:text-lg",
          isExpanded ? "" : "line-clamp-3"
        )}
      >
        “{review}”
      </p>

      {/* Rating */}
      <div className="flex items-center justify-center mt-2 sm:mt-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={clsx(
              "w-4 h-4 sm:w-5 sm:h-5",
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            )}
          />
        ))}
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center justify-center mt-3 sm:mt-4">
        {userProfile ? (
          <div className="border-2 border-gray-300 rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
            <Image
              src={userProfile}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="border-2 border-gray-300 shadow-inner rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <p className="text-gray-500 font-semibold text-2xl">
              {fullName.charAt(0).toUpperCase()}
            </p>
          </div>
        )}

        {/* Name + Title */}
        <div className="mt-3">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">{name}</h3>
          {title && <p className="text-sm sm:text-base text-gray-500">{title}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
