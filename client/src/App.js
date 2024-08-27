import React, { useState, useEffect } from 'react';
import AddNote from './components/AddNote';
import NotesList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the server
  useEffect(() => {
    fetch('http://localhost:4000/api/note')
      .then(response => response.json())
      .then(data => setNotes(data.findNotes))
      .catch(err => console.error('Error fetching notes:', err));
  }, []);

  const addNote = (content) => {
    fetch('http://localhost:4000/api/note/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
      .then(response => response.json())
      .then(() => {
        fetch('http://localhost:4000/api/note')
          .then(response => response.json())
          .then(data => setNotes(data.findNotes))
          .catch(err => console.error('Error fetching notes:', err));
      })
      .catch(err => console.error('Error adding note:', err));
  };
  
  const deleteNote = (id) => {
    fetch(`http://localhost:4000/api/note/delete/${id}`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(note => note.id !== id)))
      .catch(err => console.error('Error deleting note:', err));
  };

  return (
    <div className="app">
      <h1>Notes App</h1>
      <AddNote onAdd={addNote} />
      <NotesList notes={notes} onDelete={deleteNote} />
    </div>
  );
};

export default App;
