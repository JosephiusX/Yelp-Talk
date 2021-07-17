const express = require("express");
const Topic = require("../models/topic"); // require comment schema file from models dir
const auth = require('../middleware/auth')
const router = new express.Router();

// creating a new topic
router.post("/topics/new", async (req, res) => {
  const topic = new Topic(req.body); // name info in req.body topic
  
  try { // try the await
    
    if(!topic) { // if topic is false
      return res.status(400).send() // return error to be caught
    } // otherwise
    
    await topic.save(); // save topic
    res.redirect(`/topics/${topic._id}`); // redirect to topic by id pag
  } catch (e) {
    res.status(400).send(e);
  }
});

//  Read all topics
router.get("/topics", async (req, res) => {
  try {
    const topics = await Topic.find({}); // find topics from database
    
    if(!topics) { // if topic is false
      return res.status(400).send() // return error to be caught
    } // otherwise
    
    res.render("topics/index", { topics }); // index.ejs, giving access to topics obj
  } catch (e) {
    res.status(400).send(e);
  }
});

// takes me to new.ejs
router.get("/topics/new", (req, res) => {
  res.render("topics/new"); // new.ejs
});

// show route
router.get("/topics/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id); // find the topic with this id
    
    if(!topic) { // if topic is false
      return res.status(400).send() // return error to be caught
    } // otherwise
    
    res.render("topics/show", { topic }); // show.ejs , gives accdss to phrase obj
  } catch (e) {
    res.status(400).send(e);
  }
  
});

// find topic by id and send to edit page
router.get("/topics/:id/edit", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id); // find a topic with this id
    
    if(!topic) { // if topic is false
      return res.status(400).send() // return error to be caught
    } // otherwise
    
    res.render("topics/edit", { topic });
  } catch  (e) {
    res.status(400).send(e);
  }
  
   // edit.ejs gives access to topic
});

// submit edited topic
router.put("/topics/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const topic = await Topic.findByIdAndUpdate(id, { ...req.body.topic });
    
    if(!id) { // if id is false
      return res.status(400).send() // return error to be caught
    } // otherwise
    
    res.redirect(`/topics/${topic._id}`);
  } catch (e) {
    res.status(400).send(e);

  }
  
});

// Update topic by id
router.patch("/topics/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["topic"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {
    const topic = await Topic.findById(req.params.id);
    updates.forEach((update) => topic[update] = req.body[update])
    await topic.save()
    // const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // the 3rd arg is the options, new: true - returns the new , runValidators: true - makesure format is right

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
  const { id } = req.params; // destructuring id out of req.params
  
  try {
    await Topic.findByIdAndDelete(id);
    
    if(!id) { // if id is false
      return res.status(400).send() // return error to be caught
    } // otherwise
    
    res.redirect("/topics");
    
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
