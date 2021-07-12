const e = require("express");
const express = require("express");
const User = require("../models/user"); // require comment schema file from models dir
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body); // we take the information from the post body and set it to user

  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
