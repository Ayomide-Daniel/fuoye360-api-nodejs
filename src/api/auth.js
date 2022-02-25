const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleOauth,
} = require("../Controllers/AuthController");
const {
  validateLoginFields,
  validateRegisterFields,
  validateGoogleOauth,
} = require("../Middlewares/auth.validation");

module.exports = (app) => {
  /**
   * Registration route
   */
  router.post("/register", validateRegisterFields, register);

  /**
   * Login route
   */
  router.post("/login", validateLoginFields, login);

  /**
   * Google Oauth route
   */
  router.post("/oauth/google", validateGoogleOauth, googleOauth);

  app.use("/api/v1", router);
};
