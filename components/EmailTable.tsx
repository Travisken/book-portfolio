"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

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
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch("/api/emails");
        const data = await res.json();
        setEmails(data.emails || []);
        onEmailCountChange?.(data.emails?.length || 0);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [onEmailCountChange]);

  const handleCopy = async (email: string, id: string) => {
    await navigator.clipboard.writeText(email);
    setCopiedEmailId(id);

    setTimeout(() => {
      setCopiedEmailId(null);
    }, 1500);
  };

  const displayedEmails = showAll ? emails : emails.slice(0, 3);

  return (
    <div className="overflow-x-auto text-center w-full relative">
      <table className="w-full">
        <thead>
          <tr className="flex border-b justify-between">
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4">Date Submitted</th>
          </tr>
        </thead>

        <tbody className="flex flex-col w-full">
          {displayedEmails.map((email) => (
            <tr
              key={email.id}
              className="flex border-b justify-between w-full items-center"
            >
              <td className="py-2 px-4 flex items-center gap-2">
                <span>{email.email}</span>

                <button
                  onClick={() => handleCopy(email.email, email.id)}
                  className="text-gray-500 hover:text-black transition"
                  aria-label="Copy email"
                >
                  <Copy size={16} />
                </button>

                {copiedEmailId === email.id && (
                  <span className="ml-2 text-xs text-green-600">
                    Copied!
                  </span>
                )}
              </td>

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
