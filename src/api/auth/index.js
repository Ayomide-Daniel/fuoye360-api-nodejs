const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("../../Controllers/AuthController");
const {validateLoginFields, validateRegisterFields} = require("../../Middlewares/auth.validation")

module.exports = (app) => {
  /**
   * Registration route
   */
  router.post("/register", validateRegisterFields, registerController);

  /**
   * Login route
   */
  router.post("/login", validateLoginFields, loginController);

  app.use("/api/v1/auth", router);
};
