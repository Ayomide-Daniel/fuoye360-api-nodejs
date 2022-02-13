const express = require("express");
const router = express.Router();
const { store, index, uploadImage } = require("../Controllers/UserController");
const { verifyUser } = require("../Middlewares/verifyUser");
const { upload } = require("../../config/multer.config");

module.exports = (app) => {
  /**
   * Update user route
   */
  router.patch("/update", [verifyUser], store);

  /**
   * Get user route
   */
  router.get("/", [verifyUser], index);

  /**
   * Upload Image route
   */
  router.post(
    "/upload-image",
    [
      verifyUser,
      upload.fields([
        { name: "profile-image", maxCount: 1 },
        { name: "profile-banner", maxCount: 1 },
      ]),
    ],
    uploadImage
  );

  app.use("/api/v1/user", router);
};
