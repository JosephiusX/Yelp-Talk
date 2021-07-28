const express = require("express");
const Phrase = require("../models/phrase"); // require comment schema file from models dir
// const User = require("../models/user");
const router = new express.Router();
const auth = require('../middleware/auth')

// create new phrase
router.post("/phrases", auth, async (req, res) => {
  // const phrase = new Phrase(req.body);
  const phrase = new Phrase({
    ...req.body,
    owner: req.topic._id
  })
  
  try {
    await phrase.save(); // save phrase to db
    res.status(201).redirect(`/phrases/${phrase._id}`); // redirects to phrase with the id we just created
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read all phrases
router.get("/phrases", async (req, res) => {
  try {
    const phrases = await Phrase.find({}); // find phrases from database
    res.render("phrases/index", { phrases }); // index.ejs, giving access to phrases obj
  } catch (e) {
    res.status(400).send(e);
  }
});

// takes me to new.ejs
router.get("/phrases/new", (req, res) => {
  res.render("phrases/new"); // new.ejs
});

// Read phrase by id
router.get("/phrases/:id", async (req, res) => {
  try {
    const phrase = await Phrase.findById(req.params.id); // find the phrase with this id
    res.render("phrases/show", { phrase }); // show.ejs , gives access to phrase obj
  } catch (e) {
    res.status(400).send(e);
  }
});

// find phrase by id and send to edit page
router.get("/phrases/:id/edit", async (req, res) => {
  try{
    const phrase = await Phrase.findById(req.params.id); // find a phrase with this id
    res.render("phrases/edit", { phrase }); // edit.ejs gives access to phrase
  } catch (e) {
    res.status(400).send(e);
  }
});

// submit edited phrase
router.put("/phrases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const phrase = await Phrase.findByIdAndUpdate(id, { ...req.body.phrase });
    res.redirect(`/phrases/${phrase._id}`);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update phrase by id
router.patch("/phrases/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["phrase"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates"})
  }

  try {
    const phrase = await Phrase.findById(req.params.id);
    updates.forEach((update) => phrase[update] = req.body[update])
    await phrase.save()
    // const phrase = await Phrase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // the 3rd arg is the options, new: true - returns the new , runValidators: true - makesure format is right

    if (!phrase) {
      return res.status(404).send();
    }

    res.send(phrase);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete phrase by id
router.delete("/phrases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Phrase.findByIdAndDelete(id);
    res.redirect("/phrases");
  } catch (e) {
    res.status(400).send(e);
  }
  
});

module.exports = router;
