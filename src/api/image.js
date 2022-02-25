const express = require("express");
const router = express.Router();
const { getSomeFile } = require("../Controllers/FileController");

module.exports = (app) => {
  /**
   * User image route
   */
  router.get("/:field/:key", getSomeFile);

  app.use("/api/v1/image", router);
};
