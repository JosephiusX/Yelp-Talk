const express = require("express");
const path = require("path"); // re quire path for app.set below
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // require after npm install
const commentRouter = require("./routers/comments");
const userRouter = require("./routers/user");
const port = process.env.PORT || 3000;
require("./db/mongoose");
const User = require("./models/user");

const db = mongoose.connection; // mongoose connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs"); // set view engine to ejs
app.set("views", path.join(__dirname, "views")); // sets path to absolute

app.use(express.urlencoded({ extended: true })); // tell express to parse the body
app.use(express.json()); // automatically parsing JSON
app.use(methodOverride("_method"));
app.use(commentRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  // home route
  res.render("home"); // home.ejs
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
