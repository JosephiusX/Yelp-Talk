const express = require("express");
const Phrase = require("../models/phrase"); // require comment schema file from models dir
const router = new express.Router();

// create new phrase
router.post("/phrases/new", async (req, res) => {
  const phrase = new Phrase(req.body);
  try {
    await phrase.save(); // save phrase to db
    res.status(201).redirect(`/phrases/${phrase._id}`); // redirects to phrase with the id we just created
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read all phrases
router.get("/phrases", async (req, res) => {
  const phrases = await Phrase.find({}); // find phrases from database
  res.render("phrases/index", { phrases }); // index.ejs, giving access to phrases obj
});

// takes me to new.ejs
router.get("/phrases/new", (req, res) => {
  res.render("phrases/new"); // new.ejs
});

// Read phrase by id
router.get("/phrases/:id", async (req, res) => {
  const phrase = await Phrase.findById(req.params.id); // find the phrase with this id
  res.render("phrases/show", { phrase }); // show.ejs , gives access to phrase obj
});

// find phrase by id and send to edit page
router.get("/phrases/:id/edit", async (req, res) => {
  const phrase = await Phrase.findById(req.params.id); // find a phrase with this id
  res.render("phrases/edit", { phrase }); // edit.ejs gives access to phrase
});

// submit edited phrase
router.put("/phrases/:id", async (req, res) => {
  const { id } = req.params;
  const phrase = await Phrase.findByIdAndUpdate(id, { ...req.body.phrase });
  res.redirect(`/phrases/${phrase._id}`);
});

// Update phrase by id
router.patch("/phrases/:id", async (req, res) => {
  try {
    const phrase = await Phrase.findByIdAndUpdate(req.params.id, req.body, { new: true }); // the 3rd arg is the options, new: true - returns the new , runValidators: true - makesure format is right

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
  const { id } = req.params;
  await Phrase.findByIdAndDelete(id);
  res.redirect("/phrases");
});

module.exports = router;
