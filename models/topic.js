const mongoose = require("mongoose");
const Schema = mongoose.Schema; // set to variable for ease of use

const TopicSchema = new Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  owner: { // topic owner
    type: mongoose.Schema.Types.ObjectId, // data stored in woner will be an object id
    required: true
  }
});

module.exports = mongoose.model("Topic", TopicSchema);
