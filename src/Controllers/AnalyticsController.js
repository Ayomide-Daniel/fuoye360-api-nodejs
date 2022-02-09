const { successResponse, errorResponse } = require("../Helpers/response");
const { BroadcastLike, BroadcastRetweet } = require("../../models");
const { Op } = require("sequelize");

exports.likeBroadcast = async (req, res) => {
  const { post_id } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await BroadcastLike.create({ user_id, post_id });

    successResponse(res, 200, "Broadcast liked successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.unlikeBroadcast = async (req, res) => {
  const { post_id } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await BroadcastLike.destroy({
      where: { user_id, post_id },
    });

    successResponse(res, 200, "Broadcast unliked successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.rebroadcast = async (req, res) => {
  const { post_id } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await BroadcastRetweet.create({ user_id, post_id });

    successResponse(res, 200, "Broadcast retweeted successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.undoRebroadcast = async (req, res) => {
  const { post_id } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await BroadcastRetweet.destroy({
      where: { user_id, post_id },
    });

    successResponse(res, 200, "Broadcast unretweeted successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.addBookmark = async (req, res) => {
  const { post_id } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await BroadcastBookmark.create({
      user_id,
      post_id,
    });

    successResponse(
      res,
      200,
      "Broadcast added to bookmarks successfully",
      broadcast
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.removeBookmark = async (req, res) => {
  const { post_id } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await BroadcastBookmark.destroy({
      where: { user_id, post_id },
    });

    successResponse(
      res,
      200,
      "Broadcast removed from bookmarks successfully",
      broadcast
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};
