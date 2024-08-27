require("dotenv").config();
const Note = require("../models/notesModel");

/**
 * Adds a new note to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the note content.
 * @param {string} req.body.content - The content of the note to be added.
 * @param {Object} res - The response object.
 * 
 * @returns {Object} - Returns a JSON object with a success message and the added note data, 
 *                     
 */
const addNotes = async (req, res) => {
  const { content } = req.body;

  // Validate content
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ message: "Content cannot be empty and must be a valid string" });
  }

  try {
    // Add the note to the database
    const newNote = await Note.create({ content: content});

    res.status(200).json({ message: "Note added successfully", data: newNote });
  } catch (err) {
    console.error("Error adding note:", err);
    res.status(500).json({ message: "Error adding note" });
  }
};


/**
 * Deletes a note by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {number} req.params.id - The ID of the note to delete.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteNotes = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the ID
    if (!id) {
      return res.status(400).json({ message: "Kindly provide an ID." });
    }

    // Find the note by its ID
    const findNote = await Note.findByPk(id);
    if (!findNote) {
      return res.status(404).json({ message: `Note not found with ID ${id}.` });
    }

    // Delete the note
    await Note.destroy({ where: { id: id } });

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Error deleting note." });
  }
};

// fetch the notes from database
const fetchNotes = async (req, res) => {
  try {
     const findNotes = await Note.findAll({
      order: [['createdAt', 'DESC']] 
    });
    if (!findNotes) {
      return res.status(404).json({ message: `Note not found` });
    }

    res.status(200).json({ message: "Notes fetched successfully.",findNotes });
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ message: "Error fetching note." });
  }
};
module.exports = { addNotes, deleteNotes,fetchNotes };
