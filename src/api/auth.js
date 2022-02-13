const express = require("express");
const router = express.Router();
const { register, login } = require("../Controllers/AuthController");
const {
  validateLoginFields,
  validateRegisterFields,
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

  app.use("/api/v1", router);
};
