import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content);
      setContent(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-note-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your note here..."
        style={{ whiteSpace: 'pre-wrap' }}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
