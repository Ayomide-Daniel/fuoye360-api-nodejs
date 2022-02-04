const express = require("express");
const router = express.Router();
const { store, index } = require("../Controllers/UserController");
const { verifyUser } = require("../Middlewares/verifyUser");

module.exports = (app) => {
  /**
   * Update user route
   */
  //   router.patch("/", [verifyUser], store);

  /**
   * Get user route
   */
  router.get("/", [verifyUser], index);

  app.use("/api/v1/user", router);
};
