const express = require("express");
const router = express.Router();
const { store, index } = require("../Controllers/BroadcastController");
const { verifyUser } = require("../Middlewares/verifyUser");
const { validateStore } = require("../Middlewares/broadcast.validation");

module.exports = (app) => {
  /**
   * Create broadcast route
   */
  router.post("/", [verifyUser, validateStore], store);

  /**
   * Get broadcast route
   */
  router.get("/", [verifyUser], index);

  app.use("/api/v1/broadcast", router);
};
