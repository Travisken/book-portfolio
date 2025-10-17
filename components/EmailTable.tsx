"use client";

import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, get } from "firebase/database";

interface EmailRecord {
  id: string;
  email: string;
  createdAt: string;
}

interface EmailTableProps {
  onEmailCountChange?: (count: number) => void; // Pass total email count to parent
}

export default function EmailTable({ onEmailCountChange }: EmailTableProps) {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // Adjust path: replace with where you store emails (e.g., "data/emails")
        const emailsRef = ref(database, "data/emails");
        const snapshot = await get(emailsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const emailArray: EmailRecord[] = Object.keys(data).map((key) => ({
            id: key,
            email: data[key].email,
            createdAt: data[key].createdAt,
          }));

          // Sort by most recent
          emailArray.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setEmails(emailArray);

          // Pass total count up to parent
          if (onEmailCountChange) {
            onEmailCountChange(emailArray.length);
          }
        } else {
          setEmails([]);
          if (onEmailCountChange) onEmailCountChange(0);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        setError("Failed to fetch emails.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [onEmailCountChange]);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Slice first 3 unless showAll is true
  const displayedEmails = showAll ? emails : emails.slice(0, 3);

  return (
    <div className="overflow-x-auto text-center w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="flex border-b justify-between font-semibold text-gray-700">
            <th className="py-2 px-4 text-left w-1/2">Email</th>
            <th className="py-2 px-4 text-right w-1/2">Date Submitted</th>
          </tr>
        </thead>
        <tbody className="flex flex-col w-full">
          {displayedEmails.map((email) => (
            <tr key={email.id} className="flex border-b justify-between w-full text-gray-800">
              <td className="py-2 px-4 text-left w-1/2">{email.email}</td>
              <td className="py-2 px-4 text-right w-1/2">
                {new Date(email.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* See more / See less */}
      {emails.length > 3 && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#3ca0ce] font-semibold hover:underline focus:outline-none"
          >
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      )}
    </div>
  );
}
