const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

module.exports = {
  //   cpUpload: upload.fields([{ name: "broadcast-images", maxCount: 2 }]),
  upload,
};
