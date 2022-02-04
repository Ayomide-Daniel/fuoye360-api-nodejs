const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../Helpers/response");
const { Broadcast, User } = require("../../models");
const { Op } = require("sequelize");

exports.store = async (req, res) => {
  const { user_id, post_id, body, media } = req.body;

  try {
    const broadcast = await createTweet(user_id, post_id, body, media);

    successResponse(res, 200, "Broadcast created successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.index = async (req, res) => {
  try {
    const broadcasts = await getTweets();

    successResponse(res, 200, "Broadcasts retrieved successfully", broadcasts);
  } catch (error) {
    console.error(error);
    errorResponse(res, 422, error, null);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body;
  try {
    const broadcast = await deleteTweet(id);
    successResponse(res, 200, "Broadcast deleted successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

const createTweet = (user_id, post_id, body, media) => {
  const data = {
    user_id,
    post_id,
    body,
    media,
  };

  return Broadcast.create(data);
};

const getTweets = async () => {
  return await Broadcast.findAll();
};

const deleteTweet = (id) => {
  return Broadcast.destroy({ where: { id } });
};
