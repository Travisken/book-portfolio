"use client"

import EmailTable from "@/components/EmailTable";
import { useState } from "react";

export default function SubmittedEmails() {
  const [emailCount, setEmailCount] = useState(0); // ✅ track number of emails

  return (
    <>
      {/* ✅ Emails Section */}
      <div className="bg-white md:p-6 p-2 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Submitted Emails</h2>
          <span className="text-gray-600 text-sm">Total: {emailCount}</span>
        </div>
        <EmailTable
          onEmailCountChange={(count) => {
            console.log("Email count:", count);
            setEmailCount(count);
          }}
        />
      </div>
    </>
  );
}
