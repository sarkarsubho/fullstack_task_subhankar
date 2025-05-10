import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

interface Props {
  onAdd: (note: string) => void;
}

const NoteInput: React.FC<Props> = ({ onAdd }) => {
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!note.trim()) return;
    onAdd(note.trim());
    setNote("");
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="New Note..."
        className="flex-1 border rounded px-3 py-2 mr-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-orange-900 text-white px-4 py-2 rounded hover:bg-orange-800 flex items-center gap-2"
      >
        <BsPlusCircleFill />
        <span className="text-sm"> Add</span>
      </button>
    </div>
  );
};

export default NoteInput;
