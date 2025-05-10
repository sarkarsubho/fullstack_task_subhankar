import React from 'react';

interface Props {
  notes: string[];
}

const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <div>
      <h2 className="font-semibold mb-2">Notes</h2>
      <div className="max-h-40 overflow-y-auto border-t border-b divide-y">
        {notes.map((note, index) => (
          <div key={index} className="py-2 px-1">
            {index+1}.{note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
