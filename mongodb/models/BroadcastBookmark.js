const mongoose = require("mongoose");
const { relativeAt } = require("../../src/Helpers/modifiers");
BroadcastBookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  broadcast: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Broadcast",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// BroadcastBookmarkSchema.virtual("meta").get(function () {
//     return{
//         has_liked : this.likes.includes(user.id)
//           ? true
//           : false;
//         broadcast.meta.has_retweeted = broadcast.retweets.includes(user.id)
//           ? true
//           : false;
//         broadcast.relative_at = relativeAt(broadcast.created_at);

//     }
//   return this.email.slice(this.email.indexOf("@") + 1);
// });
module.exports = mongoose.model("Broadcast", BroadcastBookmarkSchema);
