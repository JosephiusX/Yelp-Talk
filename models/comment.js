const mongoose = require('mongoose');
const Schema = mongoose.Schema; // set to variable for ease of use

const CommentSchema = new Schema({
    topic: String,
    phrase: String,
});

module.exports = mongoose.model('Comment', CommentSchema);


