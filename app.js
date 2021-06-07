const express = require('express');
const path = require('path'); // re quire path for app.set below
const mongoose = require('mongoose');
const Comment = require('./models/comment')

mongoose.connect('mongodb://localhost:27017/talk-app', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();



app.set('view engine', 'ejs'); // set view engine to ejs
app.set('views', path.join(__dirname, 'views')) // sets path to absolute

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/comments', async(req, res) => {
    const comments = await Comment.find({})
    res.render('comments/index', {comments})
})

app.get('comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    res.render('comments/show', { comment })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

