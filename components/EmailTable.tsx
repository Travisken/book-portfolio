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
  const [copiedAll, setCopiedAll] = useState(false);

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

  const handleCopySingle = async (email: string, id: string) => {
    await navigator.clipboard.writeText(email);
    setCopiedEmailId(id);
    setTimeout(() => setCopiedEmailId(null), 1500);
  };

  const handleCopyAll = async () => {
    const allEmails = emails.map((e) => e.email).join("\n");
    await navigator.clipboard.writeText(allEmails);

    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const displayedEmails = showAll ? emails : emails.slice(0, 3);

  return (
    <div className="overflow-x-auto text-center w-full relative">
      <table className="w-full">
        <thead>
          <tr className="flex border-b justify-between items-center">
            <th className="py-2 px-4 text-left flex items-center gap-2">
              Emails
              <button
                onClick={handleCopyAll}
                className="py-2 px-4 rounded-xl gap-2 ml-4 font-semibold bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex-1 flex md:w-1/2 items-center justify-center"
                aria-label="Copy all emails"
              >
                Copy All
                <Copy size={16} />
              </button>
              {copiedAll && (
                <span className="text-xs text-green-600 ml-2">Copied all!</span>
              )}
            </th>

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
                  onClick={() => handleCopySingle(email.email, email.id)}
                  className="text-gray-500 hover:text-black transition"
                  aria-label="Copy email"
                >
                  <Copy size={16} />
                </button>

                {copiedEmailId === email.id && (
                  <span className="ml-2 text-xs text-green-600">Copied!</span>
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
