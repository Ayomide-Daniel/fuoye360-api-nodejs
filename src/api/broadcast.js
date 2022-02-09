const express = require("express");
const router = express.Router();
const { upload } = require("../../config/multer.config");
const {
  store,
  index,
  uploadImage,
} = require("../Controllers/BroadcastController");
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

  /**
   * Get broadcast route
   */
  router.post(
    "/upload-image",
    [verifyUser, upload.array("broadcast-images[]")],
    uploadImage
  );

  app.use("/api/v1/broadcast", router);
};
