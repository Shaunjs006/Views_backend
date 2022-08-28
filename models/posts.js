const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true,
  },
  Topic: {
    type: String,
    required: true,
  },
  Side: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  Like: {
    type: Number,
    required: false,
  }

});

module.exports = mongoose.model("Post", postsSchema);
