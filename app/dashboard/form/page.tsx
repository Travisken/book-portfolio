// app/admin/forms/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { FormResponse } from "@/types/form";

const PAGE_SIZE = 10;

export default function AdminFormsPage() {
  const [data, setData] = useState<FormResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/form-responses")
      .then(res => res.json())
      .then(setData);
  }, []);

  const filtered = useMemo(() => {
    return data.filter(r =>
      [r.name, r.email, r.country]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Mentorship Registrations
      </h1>

      <input
        placeholder="Search name, email, country..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 w-full md:w-1/3 border rounded-lg px-3 py-2"
      />

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Country</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Specialty</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(r => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.country}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3">
                  {r.specialties.join(", ")}
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(r.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </p>

        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
