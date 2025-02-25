import React from 'react';

interface SelectInputProps {
  books: { id: number; title: string; bookName: string }[];
  onChange: (title: string) => void;
}


const SelectInput: React.FC<SelectInputProps> = ({ books, onChange }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
  };

  return (
    <select
      onChange={handleSelectChange}
      className='w-full p-3 rounded-lg focus:outline-[#3ca0ce]'
      required
    >
      <option value='' disabled selected>
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
