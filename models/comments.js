const mongoose = require("mongoose");
const Schema = mongoose.Schema; // set to variable for ease of use

const CommentSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  phrase: String
});

module.exports = mongoose.model("Comment", CommentSchema);
