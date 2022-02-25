const mongoose = require("mongoose");
const { relativeAt } = require("../../src/Helpers/modifiers");
BroadcastSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    body: {
      type: String,
      required: true,
    },
    broadcast_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broadcast",
    },
    likes: Array,
    retweets: Array,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Broadcast",
      },
    ],
    media: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

BroadcastSchema.virtual("relative_at")
  .get(function () {
    return relativeAt(this.created_at);
  })
  .set(function (created_at) {
    created_at = this.created_at;
  });
// BroadcastSchema.virtual("meta")
//   .get(function () {
//       return{
//           is_bookmarked :
//       }
//   })
//   .set(function (_id) {
//     _id = this._id;
//   });
// ;
module.exports = mongoose.model("Broadcast", BroadcastSchema);
