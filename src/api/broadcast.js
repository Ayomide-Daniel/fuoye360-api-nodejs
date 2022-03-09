const express = require("express");
const router = express.Router();
const { upload } = require("../../config/multer.config");
const {
  store,
  index,
  destroy,
  showUser,
  getBookmarks,
  trending,
} = require("../Controllers/BroadcastController");
const { verifyUser } = require("../Middlewares/verifyUser");
const {
  validateStore,
  validateDelete,
  validateUser,
} = require("../Middlewares/broadcast/broadcast.validation");
const {
  validateAndUploadImage,
} = require("../Middlewares/broadcast/image.upload");

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
   * Delete broadcast route
   */
  router.delete("/", [verifyUser, validateDelete], destroy);

  /**
   * Get broadcast route
   */
  router.get("/", [verifyUser], index);

  /**
   * Get trending broadcast route
   */
  router.get("/trending", [verifyUser], trending);

  /**
   * Get bookmarked broadcast route
   */
  router.get("/bookmarks", [verifyUser], getBookmarks);

  /**
   * Get broadcast route
   */
  router.get("/user/:user_id", [verifyUser, validateUser], showUser);

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
