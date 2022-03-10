const { required } = require("joi");
const mongoose = require("mongoose");
const { relativeAt } = require("../src/Helpers/modifiers");

const NotificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    broadcast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broadcast",
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
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

NotificationSchema.virtual("relative_at")
  .get(function () {
    return relativeAt(this.created_at);
  })
  .set(function (created_at) {
    created_at = this.created_at;
  });

module.exports = mongoose.model("Notification", NotificationSchema);
