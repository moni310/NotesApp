import React from 'react';
import '../../src/App.css'

  
const NoteItem = ({ note, onDelete }) => {
    return (
      <div className="note-card">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-content">{note.content}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    );
  };
export default NoteItem;
