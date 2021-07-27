let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema({
  content: { type: String },
  author: String,
  articleId: { type: Schema.Types.ObjectId, ref: "Article" },
});

module.exports = mongoose.model("Comment", commentSchema);
