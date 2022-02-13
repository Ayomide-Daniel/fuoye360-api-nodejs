const jwt = require("jsonwebtoken");
const { errorResponse } = require("../Helpers/response");
const { jwtSecret } = require("../../config/jwt.config");
const { User } = require("../../models");

exports.verifyUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (typeof token != undefined) {
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        errorResponse(res, 401, "User authenticated", null);
      } else {
        const email = decoded.user.email;
        const user = await User.findOne({
          where: { email },
          attributes: { exclude: ["password", "email_verified_at"] },
        });
        if (!user) {
          errorResponse(res, 401, "TF???", null);
        }
        res.locals.user = user;
        next();
      }
    });
  } else {
    errorResponse(res, 401, "User authenticated", null);
  }
};
