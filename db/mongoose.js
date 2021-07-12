const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/talk-app", {
  // mongoose connection
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
