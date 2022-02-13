const express = require("express");
const router = express.Router();
const { upload } = require("../../config/multer.config");
const {
  store,
  index,
  getImage,
} = require("../Controllers/BroadcastController");
const { verifyUser } = require("../Middlewares/verifyUser");
const { validateStore } = require("../Middlewares/broadcast.validation");
const { validateAndUploadImage } = require("../Middlewares/image.upload");

module.exports = (app) => {
  /**
   * Create broadcast route
   */
  router.post(
    "/",
    [
      verifyUser,
      upload.array("broadcast-images"),
      validateAndUploadImage,
      validateStore,
    ],
    store
  );

  /**
   * Get broadcast route
   */
  router.get("/", [verifyUser], index);

  /**
   * Get broadcast route
   */
  router.get("/images/:key", [verifyUser], getImage);

  /**
   * Upload broadcast image route
   */
  // router.post(
  //   "/upload-image",
  //   [verifyUser, upload.array("broadcast-images[]"), uploadImage],
  //   uploadImage
  // );

  app.use("/api/v1/broadcast", router);
};
