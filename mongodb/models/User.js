const mongoose = require("mongoose");
const { relativeAt } = require("../../src/Helpers/modifiers");

const UserSchema = new mongoose.Schema(
  {
    google_id: String,
    full_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    banner: String,
    bio: String,
    location: String,
    url: String,
    broadcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Broadcast" }],
    broadcast_likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Broadcast" },
    ],
    broadcast_retweets: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Broadcast" },
    ],
    broadcast_bookmarks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Broadcast" },
    ],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
UserSchema.virtual("relative_at")
  .get(function () {
    return relativeAt(this.created_at);
  })
  .set(function (created_at) {
    created_at = this.created_at;
  });

module.exports = mongoose.model("User", UserSchema);
