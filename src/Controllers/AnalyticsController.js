const { successResponse, errorResponse } = require("../Helpers/response");
const Broadcast = require("../../models/Broadcast");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const { resolveError } = require("../Helpers/slack-notification");

exports.likeBroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    /**
     * Update the broadcast likes count
     */
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $push: { likes: { $each: [user_id], $position: 0 } },
      },
      { new: true }
    );

    if (!broadcast) {
      return errorResponse(res, 400, "Broadcast doesn't exist", null);
    }

    /**
     * Update the current user broadcast_likes count
     */
    const sender = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $push: { broadcast_likes: { $each: [broadcast_id], $position: 0 } },
      },
      { new: true }
    );

    /**
     * Create a notification for the broadcast owner
     */
    createNotification(req, user_id, "like", broadcast);

    return successResponse(
      res,
      200,
      "Broadcast liked successfully",
      broadcast.likes
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.unlikeBroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    /**
     * Update the broadcast likes count
     */
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $pull: { likes: user_id },
      },
      { new: true }
    );

    if (!broadcast) {
      return errorResponse(res, 400, "Like doesn't exist", null);
    }

    /**
     * Update the current user broadcast_likes count
     */
    const sender = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $pull: { broadcast_likes: broadcast_id },
      },
      { new: true }
    );

    /**
     * Delete notification
     */
    deleteNotification(req, user_id, "like", broadcast);

    return successResponse(
      res,
      200,
      "Broadcast unliked successfully",
      broadcast.likes
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.rebroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    /**
     * Update the broadcast retweets count
     */
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $push: { retweets: { $each: [user_id], $position: 0 } },
      },
      { new: true }
    );

    if (!broadcast) {
      return errorResponse(res, 400, "Broadcast doesn't exist", null);
    }

    /**
     * Update the current user retweets count
     */
    await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $push: {
          broadcast_retweets: { $each: [broadcast_id], $position: 0 },
        },
      },
      { new: true }
    );

    /**
     * Create a notification for the broadcast owner
     */
    createNotification(req, user_id, "retweet", broadcast);

    return successResponse(
      res,
      200,
      "Broadcast retweeted successfully",
      broadcast.retweets
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.undoRebroadcast = async (req, res) => {
  const { broadcast_id } = req.body;
  const user_id = req.user._id;
  try {
    /**
     * Update the broadcast retweets count
     */
    const broadcast = await Broadcast.findOneAndUpdate(
      {
        _id: broadcast_id,
      },
      {
        $pull: { retweets: user_id },
      },
      { new: true }
    );
    if (!broadcast) {
      return errorResponse(res, 400, "Rebroadcast doesn't exist", null);
    }

    /**
     * Update the current user retweets count
     */
    await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $pull: { broadcast_retweets: broadcast_id },
      },
      { new: true }
    );

    /**
     * Delete notification
     */
    deleteNotification(req, user_id, "retweet", broadcast);

    return successResponse(
      res,
      200,
      "Broadcast unretweeted successfully",
      broadcast.retweets
    );
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

    if (!broadcast) {
      return errorResponse(res, 400, "Broadcast doesn't exist", null);
    }

    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $push: { broadcast_bookmarks: { $each: [broadcast_id], $position: 0 } },
      },
      { new: true }
    );

    return successResponse(
      res,
      200,
      "Broadcast added to bookmarks successfully",
      null
    );
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

    if (!broadcast) {
      return errorResponse(res, 400, "Bookmark doesn't exist", null);
    }

    const user = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $pull: { broadcast_bookmarks: broadcast_id },
      },
      { new: true }
    );

    return successResponse(
      res,
      200,
      "Broadcast removed from bookmarks successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Oops! A server error occured", null);
  }
};

exports.followUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const checkIfFollow = await User.findById(req.user._id);
    if (checkIfFollow.following.includes(user_id)) {
      return errorResponse(res, 400, "An error occured", null);
    }
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
        $inc: { unread_notifications: 1 },
      },
      {
        new: true,
      }
    );

    if (!sender || !receiver) {
      return errorResponse(res, 400, "An error occured", null);
    }

    await Notification.create({
      receiver: user_id,
      sender: req.user._id,
      type: "follow",
    });

    return successResponse(res, 200, `You followed ${receiver.full_name}`, {
      sender: sender.following,
      receiver: receiver.followers,
    });
  } catch (error) {
    return resolveError(req, res, error);
  }
};

exports.unfollowUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const checkIfFollow = await User.findById(req.user._id);
    if (!checkIfFollow.following.includes(user_id)) {
      return errorResponse(res, 400, "An error occured", null);
    }
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
        $inc: { unread_notifications: -1 },
      },
      {
        new: true,
      }
    );

    if (!sender || !receiver) {
      return errorResponse(res, 400, "An error occured", null);
    }

    await Notification.findOneAndDelete({
      receiver: user_id,
      sender: req.user._id,
      type: "follow",
    });

    return successResponse(res, 200, `You unfollowed ${receiver.full_name}`, {
      sender: sender.following,
      receiver: receiver.followers,
    });
  } catch (error) {
    return resolveError(req, res, error);
  }
};

const updateUserUnreadNotifications = async (type, user_id) => {
  return await User.findByIdAndUpdate(user_id, {
    $inc: { unread_notifications: type == "inc" ? 1 : -1 },
  });
};

const createNotification = async (req, user_id, type, broadcast) => {
  await Notification.create({
    receiver: user_id,
    sender: req.user._id,
    type,
    broadcast: broadcast._id,
  });

  /**
   * Increase the notification count of the broadcast owner
   */
  return updateUserUnreadNotifications("inc", broadcast.user);
};

const deleteNotification = async (req, user_id, type, broadcast) => {
  await Notification.findOneAndDelete({
    receiver: user_id,
    sender: req.user._id,
    type,
    broadcast: broadcast._id,
  });

  /**
   * Decrease the notification count of the broadcast owner
   */
  return updateUserUnreadNotifications("dcr", broadcast.user);
};
