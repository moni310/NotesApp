import React from 'react';
import NoteItem from './NoteItem';
import '../../src/App.css'



const NotesList = ({ notes, onDelete }) => {
    return (
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onDelete={onDelete} 
          
          style={{ whiteSpace: 'pre-wrap' }}/>
          
        ))}
      </div>
    );
};



export default NotesList;
