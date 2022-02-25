const { successResponse, errorResponse } = require("../Helpers/response");
// const { BroadcastLike, BroadcastRetweet, Broadcast } = require("../../models");
const Broadcast = require("../../mongodb/models/Broadcast");
const User = require("../../mongodb/models/User");
const { Op } = require("sequelize");

exports.likeBroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $push: { likes: { $each: [user_id], $position: 0 } },
        // $push: { likes: user_id },
      },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $push: { broadcast_likes: { $each: [broadcast_id], $position: 0 } },
        // $push: { broadcast_likes: broadcast_id },
      },
      { new: true }
    );
    if (broadcast) {
      return successResponse(
        res,
        200,
        "Broadcast liked successfully",
        broadcast.likes
      );
    }
    return errorResponse(res, 400, "Broadcast doesn't exist", null);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.unlikeBroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $pull: { likes: user_id },
      },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $pull: { broadcast_likes: broadcast_id },
      },
      { new: true }
    );
    if (broadcast) {
      return successResponse(
        res,
        200,
        "Broadcast unliked successfully",
        broadcast.likes
      );
    }
    return errorResponse(res, 400, "Like doesn't exist", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.rebroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $push: { retweets: { $each: [user_id], $position: 0 } },
        // $push: { retweets: user_id },
      },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $push: { broadcast_retweets: { $each: [broadcast_id], $position: 0 } },
        // $push: { broadcast_retweets: broadcast_id },
      },
      { new: true }
    );
    if (broadcast) {
      return successResponse(
        res,
        200,
        "Broadcast retweeted successfully",
        broadcast.retweets
      );
    }
    errorResponse(res, 400, "Broadcast doesn't exist", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.undoRebroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $pull: { retweets: user_id },
      },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $pull: { broadcast_retweets: broadcast_id },
      },
      { new: true }
    );
    if (broadcast) {
      return successResponse(
        res,
        200,
        "Broadcast unretweeted successfully",
        broadcast.retweets
      );
    }

    return errorResponse(res, 400, "Rebroacast doesn't exist", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.addBookmark = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $push: { bookmarks: { $each: [user_id], $position: 0 } },
      },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $push: { broadcast_bookmarks: { $each: [broadcast_id], $position: 0 } },
      },
      { new: true }
    );
    if (broadcast) {
      return successResponse(
        res,
        200,
        "Broadcast added to bookmarks successfully",
        null
      );
    }
    errorResponse(res, 400, "Broadcast doesn't exist", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.removeBookmark = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $pull: { bookmarks: user_id },
      },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $pull: { broadcast_bookmarks: broadcast_id },
      },
      { new: true }
    );
    if (broadcast) {
      return successResponse(
        res,
        200,
        "Broadcast removed from bookmarks successfully",
        null
      );
    }
    return errorResponse(res, 400, "Bookmark doesn't exist", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.followUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const sender = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: { $each: [user_id], $position: 0 } },
      },
      { new: true }
    );
    const receiver = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { followers: { $each: [req.user._id], $position: 0 } },
      },
      {
        new: true,
      }
    );

    if (sender && receiver) {
      return successResponse(res, 200, `You followed ${receiver.full_name}`, {
        sender: sender.following,
        receiver: receiver.followers,
      });
    }
    return errorResponse(res, 400, "An error occured", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "An error occured", null);
  }
};

exports.unfollowUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const sender = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: user_id },
      },
      { new: true }
    );
    const receiver = await User.findByIdAndUpdate(
      user_id,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      }
    );

    if (sender && receiver) {
      return successResponse(res, 200, `You unfollowed ${receiver.full_name}`, {
        sender: sender.following,
        receiver: receiver.followers,
      });
    }
    return errorResponse(res, 400, "An error occured", null);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "An error occured", null);
  }
};
