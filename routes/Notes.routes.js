const express = require("express");

const { NotesModel } = require("../models/Notes.model");

const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  try {
    const notes = await NotesModel.find();
    res.send(notes);
  } catch (err) {
    res.send({ err: err.message });
  }
});

notesRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const note = new NotesModel(payload);
    await note.save();
    res.send(note);
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

notesRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  await NotesModel.findByIdAndUpdate({ _id: id }, payload);
  res.send({ msg: "NOtes successfully updated" });
});

notesRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await NotesModel.findByIdAndDelete({ _id: id });
  res.send({ msg: "NOtes successfully deleted" });
});

module.exports = { notesRouter };
