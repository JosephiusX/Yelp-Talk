
const express = require("express");
const User = require("../models/user"); // require comment schema file from models dir
const auth = require('../middleware/auth')
const router = new express.Router();

// create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password) // runs the middleware in models with thease arguments
    const token = await user.generateAuthToken()
    res.send({ user: user, token})
  } catch (e) {
    res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) =>{ // using filter array method on user tokens
      return token.token !== req.token // returns true if token we are looking at isint the one used for auth 
    }) // if equal return false removing from array
    await req.user.save() // save result above
    
    res.send() // if things went well 
  } catch (e) {
    res.status(500).send() // if it didnt work
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
 });

// Read a user
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// Update user
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body); // convert our req.body object into an array of properties
  const allowedUpdates = ["name", "email", "password", "age"]; // what is allowed to be updated
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); // can the updates be found in allowed updates
  // updates.every is an array method , gets called for every update , it makes sure everything in array is one of the items in allowed updates array

  if (!isValidOperation) { // if any of the items we are trying to update arent one of the allowed updates, 
    return res.status(400).send({ error: "Invalid updates!" }); // return error
  }

  try {
    // thease 2 lines do the same as the one line below but dynamic so that it works even if the keys change over time
    const user = await User.findById(req.params.id);
    updates.forEach((update) => user[update] = req.body[update]);
    await user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

