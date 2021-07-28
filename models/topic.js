const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  owner: {
    // topic owner
    type: mongoose.Schema.Types.ObjectId, // data stored in woner will be an object id
    required: true,
    ref: "User",
  },
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
