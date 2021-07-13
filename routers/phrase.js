const express = require("express");
const Phrase = require("../models/phrase"); // require comment schema file from models dir
const router = new express.Router();

// view all phrases
router.get("/phrases", async (req, res) => {
  const phrases = await Phrase.find({}); // find phrases from database
  res.render("phrases/index", { phrases }); // index.ejs, giving access to phrases obj
});

// takes me to new phrase page
router.get("/phrases/new", (req, res) => {
  res.render("phrases/new"); // new.ejs
});

// create new phrase
router.post("/phrases", async (req, res) => {
  const phrase = new Phrase(req.body.phrase);
  await phrase.save(); // save phrase to db
  res.redirect(`/phrases/${phrase._id}`); // redirects to phrase with the id we just created
});

// view phrase by id
router.get("/phrases/:id", async (req, res) => {
  const phrase = await Phrase.findById(req.params.id); // find the phrase with this id
  res.render("phrases/show", { phrase }); // show.ejs , gives accdss to phrase obj
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

// delete phrase by id
router.delete("/phrases/:id", async (req, res) => {
  const { id } = req.params;
  await Phrase.findByIdAndDelete(id);
  res.redirect("/phrases");
});

module.exports = router;
