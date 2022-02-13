const { uploadFile } = require("../../../config/s3.config");
const sharp = require("sharp");
const uuid = require("uuid");
exports.validateAndUploadImage = async (req, res, next) => {
  console.log(req.files);
  if (req.files["user-banner"]) {
    req.body.media = await upload(req.files["user-banner"][0]);
  }
  if (req.files["user-image"]) {
    req.body.media = await upload(req.files["user-image"][0]);
  }
  next();
};

let media = [];

const upload = async (file) => {
  const { buffer, fieldname } = file;
  const timestamp = new Date().getTime();
  const renamedFile = `${timestamp}-${uuid.v4()}.webp`;
  const data = await sharp(buffer).webp({ quality: 50 }).toBuffer();
  const result = await uploadFile(data, fieldname, renamedFile);
  if (fieldname === "user-banner") {
    media.push({ banner: result.key });
  } else if (fieldname === "user-image") {
    media.push({ image: result.key });
  }
  return media;
};
