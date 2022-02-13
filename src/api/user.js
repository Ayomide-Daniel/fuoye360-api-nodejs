const express = require("express");
const router = express.Router();
const { store, index, uploadImage } = require("../Controllers/UserController");
const { verifyUser } = require("../Middlewares/verifyUser");
const { upload } = require("../../config/multer.config");
const { validateAndUploadImage } = require("../Middlewares/user/image.upload");
const { validateStore } = require("../Middlewares/user/user.validation");

module.exports = (app) => {
  /**
   * Update user route
   */
  router.patch(
    "/update",
    [
      verifyUser,
      upload.fields([
        { name: "user-image", maxCount: 1 },
        { name: "user-banner", maxCount: 1 },
      ]),
      validateAndUploadImage,
      validateStore,
    ],
    store
  );

  /**
   * Get user route
   */
  router.get("/", [verifyUser], index);

  /**
   * Upload Image route
   */
  // router.post(
  //   "/upload-image",
  //   [
  //     verifyUser,
  //     upload.fields([
  //       { name: "profile-image", maxCount: 1 },
  //       { name: "profile-banner", maxCount: 1 },
  //     ]),
  //   ],
  //   uploadImage
  // );

  app.use("/api/v1/user", router);
};
