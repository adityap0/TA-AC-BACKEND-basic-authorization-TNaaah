let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let podcastSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    owner: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcast", podcastSchema);
