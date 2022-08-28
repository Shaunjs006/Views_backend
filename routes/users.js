const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Getting all User informations
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one User information
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Creating new user
router.post("/", async (req, res) => {
  const user = new User({
    Username: req.body.Username,
    Email: req.body.Email,
    Password: req.body.Password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Loging into account "return id and username as json"
router.post("/login", async (req, res) => {
  const userlogin = new User({
    Email: req.body.Email,
    Password: req.body.Password,
  });
  let matcheduser;
  try {
    // User.findOne({ Email: userlogin.Email }).then((data)=>{
    //     res.json(matcheduser);
    // })
    matcheduser = await User.findOne({ Email: userlogin.Email });
    if (matcheduser == null) {
      return res.status(404).json({ message: "Cannot find user" });
    } else if (matcheduser.Password === userlogin.Password) {
      res.json(matcheduser);
    } else {
      return res.status(404).json({ message: "Wrong Password" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Updating user information
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.Username != null) {
    res.User.Username = req.body.Username;
  }
  if (req.body.Email != null) {
    res.User.Email = req.body.Email;
  }
  if (req.body.Password != null) {
    res.User.Password = req.body.Password;
  }
  try {
    const updatedUser = await res.User.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "Deleted user"})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})


async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
