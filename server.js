require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const userRouter = require("./routes/users.js");
const topicRouter = require("./routes/topics.js");
const postsRouter = require("./routes/posts.js");

app.use("/users", userRouter);
app.use("/topics", topicRouter);
app.use("/posts", postsRouter);


app.listen(80, () => console.log("Server Started"));
