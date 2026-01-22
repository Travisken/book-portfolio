// app/admin/forms/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { FormResponse } from "@/types/form";

const PAGE_SIZE = 10;

export default function AdminFormsPage() {
  const [data, setData] = useState<FormResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/form-responses")
      .then(res => res.json())
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return data.filter(r =>
      [r.name, r.email, r.country]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast(`${label} copied`);
    setTimeout(() => setToast(null), 2000);
  };

  const allEmails = filtered.map(r => r.email).join(", ");
  const allPhones = filtered.map(r => r.phone).join(", ");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Mentorship Registrations
      </h1>

      {/* Search + Actions */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          placeholder="Search name, email, country..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 border rounded-lg px-3 py-2"
        />

        <div className="flex gap-2 md:ml-auto">
          <button
            onClick={() => copyToClipboard(allEmails, "Emails")}
            disabled={!filtered.length}
            className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            Copy Emails
          </button>

          <button
            onClick={() => copyToClipboard(allPhones, "Phone numbers")}
            disabled={!filtered.length}
            className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            Copy Phones
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="py-20 text-center text-gray-500">
          Loading registrations…
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center border rounded-xl text-gray-500">
          <p className="text-lg font-medium">
            No registrations found
          </p>
          <p className="text-sm mt-1">
            Try adjusting your search or check back later.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && filtered.length > 0 && (
        <>
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
                  <tr
                    key={r.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">
                      {r.name}
                    </td>
                    <td className="p-3">{r.country}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.phone}</td>
                    <td className="p-3">
                      {r.specialties.join(", ")}
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(
                        r.timestamp
                      ).toLocaleDateString()}
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
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
