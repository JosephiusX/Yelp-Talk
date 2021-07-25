
const express = require("express");
const User = require("../models/user"); // require comment schema file from models dir
const auth = require('../middleware/auth')
const router = new express.Router();

// read register.ejs
router.get('/register', async (req, res) => { // read route
  res.render('users/register') // renders to register.ejs
})

// create user
router.post("/register", async (req, res) => { // create /register
  const user = new User(req.body); // 

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users/login', async (req, res) => {
  res.render('users/login')
})

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password) // runs the middleware in models with thease arguments
    const token = await user.generateAuthToken()
    res.send({ user, token})
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



// Update user by id
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body); // convert our req.body object into an array of properties
  const allowedUpdates = ["name", "email", "password", "age"]; // what is allowed to be updated
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); // can the updates be found in allowed updates
  // updates.every is an array method , gets called for every update , it makes sure everything in array is one of the items in allowed updates array

  if (!isValidOperation) { // if any of the items we are trying to update arent one of the allowed updates, 
    return res.status(400).send({ error: "Invalid updates!" }); // return error
  }

  try {
    // thease 2 lines do the same as the one line below but dynamic so that it works even if the keys change over time
    
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete user by id
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

