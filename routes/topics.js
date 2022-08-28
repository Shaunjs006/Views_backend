const express = require("express");
const router = express.Router();
const Topic = require("../models/topics");

// Getting all topics informations
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one topics information
router.get("/:id", getTopic, (req, res) => {
  res.json(res.topic);
});

// Creating new topic
router.post("/", async (req, res) => {
  console.log("this step is running")
    const topic = new Topic({
    TopicName: req.body.TopicName,
    Popularity: req.body.Popularity,
    Agree: req.body.Agree,
    Disagree: req.body.Disagree,
    UserId: req.body.UserId,
    Like: req.body.Like,
    Source: req.body.Source,
  });
  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting
router.delete("/:id", getTopic, async (req, res) => {
  try {
    await res.topic.remove();
    res.json({ message: "Deleted Topic" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Likefunction and unlike & agree and disagree
router.patch("/:id", getTopic, async (req, res) => {
  // like function
  if (req.body.Like != null) {
    console.log(typeof req.body.Like);
    if (typeof req.body.Like == "number") {
      console.log(req.body.Like);
      res.topic.Like += req.body.Like;
    }
  }

  // agree
  if (req.body.Agree != null) {
    console.log(typeof req.body.Agree);
    if (typeof req.body.Agree == "number") {
      console.log(req.body.Agree);
      res.topic.Agree += req.body.Agree;
    }
  }

  // disagree
  if (req.body.Disagree != null) {
    console.log(typeof req.body.Disagree);
    if (typeof req.body.Disagree == "number") {
      console.log(req.body.Disagree);
      res.topic.Disagree += req.body.Disagree;
    }
  }
  try {
    const updatedTopic = await res.topic.save();
    res.json(updatedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getTopic(req, res, next) {
  let topic;
  try {
    topic = await Topic.findById(req.params.id);
    if (topic == null) {
      return res.status(404).json({ message: "Cannot find that Topic" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.topic = topic;
  next();
}

module.exports = router;
