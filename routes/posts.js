const express = require("express");
const posts = require("../models/posts");
const router = express.Router();
const Post = require("../models/posts");

// Getting all post informations
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one post information
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Creating new post
router.post("/", async (req, res) => {
  const post = new Post({
    Content: req.body.Content,
    Topic: req.body.Topic,
    Side: req.body.Side,
    UserId: req.body.UserId,
    Like: req.body.Like,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Deleted comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Likefunction and unlike
router.patch("/:id", getPost, async (req, res) => {
  if (req.body.Like != null) {
    console.log(typeof(req.body.Like))
    if (typeof req.body.Like  == "number") {
        console.log(req.body.Like)
      res.post.Like += req.body.Like;
    }
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find that comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

module.exports = router;
