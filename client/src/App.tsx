import { useEffect, useState } from "react";
import NoteInput from "./components/NoteInput.tsx";
import NoteList from "./components/NoteList.tsx";
import { fetchAllTasks } from "./services/api.ts";
import { initSocket, sendTask } from "./services/socket.ts";

function App() {
  const [notes, setNotes] = useState<string[]>([]);
  useEffect(() => {
    fetchAllTasks().then(setNotes);
    initSocket((newNote: string) => {
      setNotes((prev) => [...prev, newNote]);
    });
  }, []);

  const handleAddNote = (note: string) => {
    sendTask(note);
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-xl w-96 max-w-full">
        <div className="flex items-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/831/831271.png"
            alt="icon"
            loading="lazy"
            className="w-6 h-6 mr-2"
          />
          <h1 className="text-xl font-bold">Note App</h1>
        </div>
        <NoteInput onAdd={handleAddNote} />
        <NoteList notes={notes} />
      </div>
    </div>
  );
}

export default App;
