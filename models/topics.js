const mongoose = require("mongoose");

const topicsSchema = new mongoose.Schema({
  TopicName: {
    type: String,
    required: true,
  },
  Popularity: {
    type: Number,
    required: true,
  },
  Agree: {
    type: Number,
    required: true,
  },
  Disagree: {
    type: Number,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  Like: {
    type: Number,
    required: true,
  },
  Source: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Topic", topicsSchema);
