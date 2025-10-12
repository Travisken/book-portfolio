import React, { useState } from 'react';

interface SelectInputProps {
  books: { id: number; title: string; bookName: string }[];
  onChange: (title: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ books, onChange }) => {
  const [selectedBook, setSelectedBook] = useState(''); // track the value

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBook(value);
    onChange(value);
  };

  return (
    <select
      value={selectedBook} // ✅ use value, not selected
      onChange={handleSelectChange}
      className="w-full p-3 rounded-lg focus:outline-[#3ca0ce]"
      required
    >
      <option value="" disabled>
        Select a book
      </option>

      {books.map((book) => (
        <option key={book.id} value={book.title}>
          {book.title}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
