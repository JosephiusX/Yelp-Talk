const mongoose = require("mongoose");
const Schema = mongoose.Schema; // set to variable for ease of use

const PhraseSchema = new Schema({
  phrase: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Phrase", PhraseSchema);
