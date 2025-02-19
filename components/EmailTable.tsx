// components/EmailTable.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';

export default function EmailTable() {
  // const [emails, setEmails] = useState([]);

//   useEffect(() => {
//     axios.get('/api/emails').then((res) => setEmails(res.data));
//   }, []);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {/* {emails.map((email) => (
            <tr key={email.id}>
              <td className="py-2 px-4 border-b">{email.email}</td>
              <td className="py-2 px-4 border-b">{email.date}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}