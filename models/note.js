import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  backroundColor: {
    type: String,
    default: "#ffffff"
  }
});

const NoteModel = mongoose.model("Note", NoteSchema);
export default NoteModel;
