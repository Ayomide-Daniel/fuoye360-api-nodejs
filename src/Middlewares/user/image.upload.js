const { uploadFile } = require("../../../config/s3.config");
const sharp = require("sharp");
const uuid = require("uuid");
const { resolveError } = require("../../Helpers/slack-notification");
exports.validateAndUploadImage = async (req, res, next) => {
  req.body.banner = req.user.banner;
  req.body.image = req.user.image;
  if (req.files["user-banner"]) {
    try {
      req.body.banner = await upload(req, req.files["user-banner"][0]);
    } catch (error) {
      return resolveError(req, res, error);
    }
  }
  if (req.files["user-image"]) {
    try {
      req.body.image = await upload(req, req.files["user-image"][0]);
    } catch (error) {
      return resolveError(req, res, error);
    }
  }
  next();
};

const upload = async (req, file) => {
  const { buffer, fieldname } = file;
  const timestamp = new Date().getTime();
  const renamedFile = `${timestamp}-${uuid.v4()}`;
  const data = await sharp(buffer).webp({ lossless: true }).toBuffer();
  const result = await uploadFile(data, fieldname, renamedFile);
  if (fieldname === "user-banner") {
    return (req.body.banner = `${process.env.APP_URL}/api/v1/image/${result.key}`);
  } else if (fieldname === "user-image") {
    return (req.body.image = `${process.env.APP_URL}/api/v1/image/${result.key}`);
  }
};
