const mongoose = require("mongoose");
const Schema = mongoose.Schema; // set to variable for ease of use

const TopicSchema = new Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
  // ,
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // }
});

module.exports = mongoose.model("Topic", TopicSchema);
