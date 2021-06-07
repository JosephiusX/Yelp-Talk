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

app.use(express.urlencoded({ extended: true})) // tell express to parse the body

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/comments', async(req, res) => {
    const comments = await Comment.find({})
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', async(req, res) => {
    const comment = new Comment(req.body.comment);
    await comment.save();
    res.redirect(`/comments/${comment._id}`)
})

app.get('/comments/:id', async(req, res) => { // show route
    const comment = await Comment.findById(req.params.id)
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', async(req, res) => {
    const comment = await Comment.findById(req.params.id)
    res.render('comments/edit', { comment })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

