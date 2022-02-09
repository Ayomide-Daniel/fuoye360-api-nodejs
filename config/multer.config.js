const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage });

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};
module.exports = {
  //   cpUpload: upload.fields([{ name: "broadcast-images", maxCount: 2 }]),
  upload: multer({ storage }),
};
