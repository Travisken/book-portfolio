'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaUndo, FaRedo, FaHighlighter 
} from 'react-icons/fa';

const fontList = ['Arial', 'Verdana', 'Times New Roman', 'Garamond', 'Georgia', 'Courier New', 'cursive'];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  value: string;
}

const RichTextEditor: React.FC<ModalProps> = ({ isOpen, onClose, onSave, value }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('3');
  const [fontName, setFontName] = useState('Arial');
  const [activeCommands, setActiveCommands] = useState<string[]>([]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value,isOpen]);

  if (!isOpen) return null;

  const modifyText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    toggleActiveState(command);
  };

  const toggleActiveState = (command: string) => {
    setActiveCommands((prev) =>
      prev.includes(command) ? prev.filter((cmd) => cmd !== command) : [...prev, command]
    );
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[90vmin] p-6 rounded-lg shadow-xl mx-auto mt-20">

        <h3 className='text-xl font-semibold pb-4'>
            About Book
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'bold', icon: <FaBold />, title: 'Bold' },
            { id: 'italic', icon: <FaItalic />, title: 'Italic' },
            { id: 'underline', icon: <FaUnderline />, title: 'Underline' },
            { id: 'strikethrough', icon: <FaStrikethrough />, title: 'Strikethrough' },
            { id: 'undo', icon: <FaUndo />, title: 'Undo' },
            { id: 'redo', icon: <FaRedo />, title: 'Redo' },
          ].map(({ id, icon, title }) => (
            <button
              key={id}
              onClick={() => modifyText(id)}
              className={`relative p-2 border rounded-md shadow-md text-gray-800 hover:bg-gray-200 transition ${
                activeCommands.includes(id) ? 'bg-gray-300' : 'bg-white'
              }`}
            >
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 hover:opacity-100">
                {title}
              </span>
              {icon}
            </button>
          ))}

          {/* Font Selectors */}
          <select onChange={(e) => modifyText('fontName', e.target.value)} value={fontName} className="p-2 border rounded-md">
            {fontList.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <select onChange={(e) => modifyText('fontSize', e.target.value)} value={fontSize} className="p-2 border rounded-md">
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>
            ))}
          </select>

          {/* Color Picker */}
          <input type="color" onChange={(e) => modifyText('foreColor', e.target.value)} className="w-10 h-10" />
        </div>

        {/* Editable Content */}
        <div
          ref={editorRef}
          contentEditable
          className="border p-5 min-h-[50vh] focus:outline-none"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
            Cancel
          </button>
          <button onClick={() => onSave(editorRef.current?.innerHTML || '')} className="px-4 py-2 bg-[#3ca0ca] text-white rounded-md transition-all duration-500 hover:bg-[#2c7798]">
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default RichTextEditor;
