import express from "express";
import Note from "../models/Note.js";
const router = express.Router();

// Search notes by title or content
router.get('/search', async (req, res) => {
  try {
      const query = req.query.query;

      if (!query) {
          return res.status(400).json({ message: 'Search query is required' });
      }

      const notes = await Note.find({
          $or: [
              { title: { $regex: query, $options: 'i' } },
              { content: { $regex: query, $options: 'i' } }
          ]
      });

      res.json(notes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Getting all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Getting one note by id
router.get("/:id", getNote, async (req, res) => {
  res.json(res.note);
  const note= await Note.findById(req.params.id);
  return res.status(200).json({note});
});

// Creating a new one
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      ...req.body
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Updating one note by id
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleting one note by id
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted note" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ error: "The note isn't found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  res.note = note;
  next();
}



export default router;