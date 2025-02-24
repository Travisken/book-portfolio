// components/EmailTable.tsx
import { useEffect, useState } from 'react';
import { database } from '@/app/firebase'; // Adjust the path as necessary
import { ref, get } from 'firebase/database';

interface Testimonial {
  id: string;
  email: string;
  createdAt: string; // Ensure this field exists in your database
}

export default function EmailTable() {
  const [emails, setEmails] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const testimonialsRef = ref(database, 'data/testimonials'); // Adjust the path based on your structure
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const emailArray: Testimonial[] = Object.keys(data).map((key) => ({
            id: key, // Use Firebase-generated key as ID
            email: data[key].email, // Extract email
            createdAt: data[key].createdAt, // Extract createdAt
          }));
          console.log('Emails array:', emailArray); // Log emails array
          setEmails(emailArray);
        } else {
          console.log('No testimonials found');
          setEmails([]);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        setError("Failed to fetch emails.");
        setEmails([]);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto text-center w-full">
      <table className="w-full ">
        <thead>
          <tr className='flex border-b justify-between'>
            <th className="py-2 px-4 ">Email</th>
            <th className="py-2 px-4">Date Submitted</th>
          </tr>
        </thead>
        <tbody className='text-center flex flex-col w-[100%]'>
          {emails.map((email) => (
            <tr key={email.id} className='flex border-b justify-between w-full'>
              <td className="py-2 px-4">{email.email}</td>
              <td className="py-2 px-4">
                {new Date(email.createdAt).toLocaleDateString()} {/* Format the date */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}