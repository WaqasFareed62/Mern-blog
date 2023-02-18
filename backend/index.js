const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/UserModel");
const Post = require("./models/PostModel");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);
const secret = "JDFSAJDJDAJDADJAJDSJ";
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://waqas:waqasf123@cluster0.pjk87vz.mongodb.net/?retryWrites=true&w=majority"
);
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const registerDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(registerDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Creditionls");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//create Post
app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const part = originalname.split(".");
  const ext = part[part.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summery, content } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postDoc = await Post.create({
      title,
      summery,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});
// Get posts
app.get("/post", async (req, res) => {
  const post = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(post);
});
//getting one post
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const found = await Post.findById(id);
  res.json(found);
});
//Updating the Post

app.put("/post", upload.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;

      const { id, title, summery, content } = req.body;
      const postDocs = await Post.findById(id);
      const isAuthor =
        JSON.stringify(postDocs.author) === JSON.stringify(info.id);

      if (!isAuthor) {
        return res.status(400).json("you are nota author");
      }
      await postDocs.update({
        title,
        summery,
        content,
        cover: newPath ? newPath : postDocs.cover,
      });

      res.json(postDocs);
    });
  }
});
app.listen(4000, () => {
  console.log("Server Started On port 4000");
});

//mongodb+srv://waqas:waqasf123@cluster0.pjk87vz.mongodb.net/?retryWrites=true&w=majority
