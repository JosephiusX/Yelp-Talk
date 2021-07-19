const express = require("express");
const path = require("path"); // re quire path for app.set below
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // require after npm install
require("./db/mongoose"); // just runs mongoose file without setting to a variable
const phraseRouter = require("./routers/phrase");
const userRouter = require("./routers/user");
const topicRouter = require("./routers/topic");

const port = process.env.PORT || 3000;
const app = express();


const db = mongoose.connection; // mongoose connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


app.set("view engine", "ejs"); // set view engine to ejs
app.set("views", path.join(__dirname, "views")); // sets path to absolute

app.use(express.urlencoded({ extended: true })); // tell express to parse the body
app.use(express.json()); // automatically parsing JSON
app.use(methodOverride("_method"));

app.use(phraseRouter);
app.use(userRouter);
app.use(topicRouter);

app.get("/", (req, res) => {
  // home route
  res.render("home"); // home.ejs
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

/////////////// testing bcrypt

// const myFunction = async () => {
//   const password = "Red12345!";
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare("red12345!", hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

//////////////// testing jsonwebtoken

// const jwt = require('jsonwebtoken')

// const myToken = async () => {
//   // create auth token 
//   const token = jwt.sign({_id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days'})
//   console.log(token)

//   // verify token
//   const data = jwt.verify(token, 'thisismynewcourse') // makes sure kephrase matches the one in sign
//   console.log(data);
// }

// myToken()

/////////////////////////////// middleware practice

// app.use((req, res, next) => {
//   if(req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next() // lets express know that we are done running middleware
//   }
// })


/////////////////////////// understanding toJSON

// const pet = {
//   name: 'Hal'
// }

// pet.toJSON = function () {
//   return {}
// }

// console.log(JSON.stringify(pet))

/////////////////////////// understanding relationships

// const Topic = require('./models/topic')
// const User = require('./models/user')

// const main = async () => {
//   // const topic = await Topic.findById('60f3194776ea43e890481d45')
//   // await topic.populate('owner').execPopulate() // populates owner object instead of just id
//   // console.log(topic.owner)
  
//   const user = await User.findById('60f315e1722705dc8cf1d435')
//   await user.populate('topic').execPopulate()
//   console.log(user.topic);
  
  
// }

// main()

