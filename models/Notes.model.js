const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  title: { type: String, required: true },
  userID: String,
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = { NotesModel };
