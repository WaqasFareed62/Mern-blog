const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    summery: String,
    content: String,
        cover: String,
    author:{type:mongoose.Schema.Types.ObjectId ,ref:'User'}
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Post", PostSchema);
module.exports = model;
