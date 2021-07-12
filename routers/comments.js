const express = require("express");
const Comment = require("../models/comments"); // require comment schema file from models dir
const router = new express.Router();

router.get("/comments", async (req, res) => {
  // comments route
  const comments = await Comment.find({}); // find comments from database
  res.render("comments/index", { comments }); // index.ejs, giving access to comments obj
});

router.get("/comments/new", (req, res) => {
  // new comment route
  res.render("comments/new"); // new.ejs
});

router.post("/comments", async (req, res) => {
  // save route
  const comment = new Comment(req.body.comment);
  await comment.save(); // save comment to db
  res.redirect(`/comments/${comment._id}`); // redirects to comment with the id we just created
});

router.get("/comments/:id", async (req, res) => {
  // show route
  const comment = await Comment.findById(req.params.id); // find the comment with this id
  res.render("comments/show", { comment }); // show.ejs , gives accdss to comment obj
});

router.get("/comments/:id/edit", async (req, res) => {
  // edit route
  const comment = await Comment.findById(req.params.id); // find a comment with this id
  res.render("comments/edit", { comment }); // edit.ejs gives access to comment
});

router.put("/comments/:id", async (req, res) => {
  // submit edited route
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(id, { ...req.body.comment });
  res.redirect(`/comments/${comment._id}`);
});

router.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.redirect("/comments");
});

module.exports = router;
