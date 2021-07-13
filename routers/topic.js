const express = require("express");
const Topic = require("../models/topic"); // require comment schema file from models dir
const router = new express.Router();

// creating a new topic
router.post("/topics/new", async (req, res) => {
  const topic = new Topic(req.body); // name info in req.body topic
  await topic.save();
  res.redirect(`/topics/${topic._id}`);
});

//  Read all topics
router.get("/topics", async (req, res) => {
  const topics = await Topic.find({}); // find topics from database
  res.render("topics/index", { topics }); // index.ejs, giving access to topics obj
});

// takes me to new.ejs
router.get("/topics/new", (req, res) => {
  res.render("topics/new"); // new.ejs
});

// show route
router.get("/topics/:id", async (req, res) => {
  const topic = await Topic.findById(req.params.id); // find the topic with this id
  res.render("topics/show", { topic }); // show.ejs , gives accdss to phrase obj
});

// find topic by id and send to edit page
router.get("/topics/:id/edit", async (req, res) => {
  const topic = await Topic.findById(req.params.id); // find a topic with this id
  res.render("topics/edit", { topic }); // edit.ejs gives access to topic
});

// submit edited topic
router.put("/topics/:id", async (req, res) => {
  const { id } = req.params;
  const topic = await Topic.findByIdAndUpdate(id, { ...req.body.topic });
  res.redirect(`/topics/${topic._id}`);
});

// Update topic by id
router.patch("/topics/:id", async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // the 3rd arg is the options, new: true - returns the new , runValidators: true - makesure format is right

    if (!topic) {
      return res.status(404).send();
    }

    res.send(topic);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete topic by id
router.delete("/topics/:id", async (req, res) => {
  const { id } = req.params;
  await Topic.findByIdAndDelete(id);
  res.redirect("/topics");
});

module.exports = router;
