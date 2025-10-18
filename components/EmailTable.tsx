"use client";

import { useEffect, useState } from "react";

interface Email {
  id: string;
  email: string;
  createdAt: string;
}

interface EmailTableProps {
  onEmailCountChange?: (count: number) => void;
}

export default function EmailTable({ onEmailCountChange }: EmailTableProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch("/api/emails");
        const data = await res.json();
        console.log("Fetched emails:", data.emails);
        setEmails(data.emails || []);
        onEmailCountChange?.(data.emails?.length || 0);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [onEmailCountChange]);

  const displayedEmails = showAll ? emails : emails.slice(0, 3);

  return (
    <div className="overflow-x-auto text-center w-full">
      <table className="w-full">
        <thead>
          <tr className="flex border-b justify-between">
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Date Submitted</th>
          </tr>
        </thead>
        <tbody className="text-center flex flex-col w-full">
          {displayedEmails.map((email) => (
            <tr key={email.id} className="flex border-b justify-between w-full">
              <td className="py-2 px-4">{email.email}</td>
              <td className="py-2 px-4">
                {new Date(email.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {emails.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-gray-600 font-semibold mt-3 underline"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}
