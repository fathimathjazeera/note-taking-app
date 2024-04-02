import NoteModel from "../models/note.js";

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.username,"username")
  const newNote = await NoteModel.create({
    title: title,
    description: description,
  });
  res.status(201).json({
    status:"success",
    message:"successfully created note",
    note:newNote,
    username: req.username
  });
};

export const getAllNotes = async (req, res) => {
  const Notes = await NoteModel.find();
  if (!Notes) {
    res.send("There is no notes");
  }
  res.status(200).json({
    status:"success",
    message:"successfully fetched notes",
    data:Notes
  });
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const Note = await NoteModel.findByIdAndUpdate(id, {
    title,
    description,
  },{new:true});
  res.status(200).json(Note);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  await NoteModel.findByIdAndDelete(id);
  res.status(200).json({ status:" success ",message: "deleted blog successfully" });
};
