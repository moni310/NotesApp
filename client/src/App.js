import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const fetchData = async () => {
    return fetch("http://localhost:4000/api/note")
      .then((response) => response.json())
      .then((data) => setNotes(data.findNotes))
      .catch((err) => console.error("Error fetching notes:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNote = (content) => {
    fetch("http://localhost:4000/api/note/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then(fetchData)
      .catch((err) => console.error("Error adding note:", err));
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:4000/api/note/delete/${id}`, { method: "DELETE" })
      .then(() => setNotes(notes.filter((note) => note.id !== id)))
      .catch((err) => console.error("Error deleting note:", err));
  };

  const handleSubmit = (e) => {
    console.log(e.key);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote(content);
      setContent("");
    }
  };

  return (
    <div className="app">
      <h1>Notes App</h1>
      <div className="add-note-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your note here..."
          style={{ whiteSpace: "pre-wrap" }}
          onKeyDown={handleSubmit}
        />
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <p className="note-content">{note.content}</p>
            <button
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
