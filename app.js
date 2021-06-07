const express = require('express');
const path = require('path'); // re quire path for app.set below
const mongoose = require('mongoose');
const Comment = require('./models/comment') // require comment schema file from models dir

mongoose.connect('mongodb://localhost:27017/talk-app', { // mongoose connection 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection; // mongoose connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs'); // set view engine to ejs
app.set('views', path.join(__dirname, 'views')) // sets path to absolute

app.use(express.urlencoded({ extended: true})) // tell express to parse the body

app.get('/', (req, res) => { // home route
    res.render('home') // home.ejs
})

app.get('/comments', async(req, res) => { // comments route
    const comments = await Comment.find({}) // find comments from database
    res.render('comments/index', {comments}) // index.ejs, giving access to comments obj 
})

app.get('/comments/new', (req, res) => { // new comment route
    res.render('comments/new') // new.ejs
})

app.post('/comments', async(req, res) => { // save route
    const comment = new Comment(req.body.comment); 
    await comment.save(); // save comment to db
    res.redirect(`/comments/${comment._id}`) // redirects to comment with the id we just created
})

app.get('/comments/:id', async(req, res) => { // show route
    const comment = await Comment.findById(req.params.id) // find the comment with this id
    res.render('comments/show', { comment }); // show.ejs , gives accdss to comment obj
})

app.get('/comments/:id/edit', async(req, res) => { // edit route
    const comment = await Comment.findById(req.params.id) // find a comment with this id
    res.render('comments/edit', { comment }); // edit.ejs gives access to comment
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

