import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // creationDate: {
  //   type: Date,
  //   default: Date.now,
  // },
},{timestamps:true});

const Note = mongoose.model('Note', noteSchema);

export default Note;
