const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../../config/jwt.config");
const { successResponse, errorResponse } = require("../Helpers/response");
const { User } = require("../../models");

exports.index = async (req, res) => {
  const user = res.locals.user;
  try {
    successResponse(res, 200, "User retreived successfully", {
      user,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};
