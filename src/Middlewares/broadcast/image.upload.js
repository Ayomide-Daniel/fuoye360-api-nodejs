const { uploadFile } = require("../../../config/s3.config");
const sharp = require("sharp");
const uuid = require("uuid");
const { resolveError } = require("../../Helpers/slack-notification");

exports.validateAndUploadImage = async (req, res, next) => {
  req.body.media = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const { buffer, fieldname } = file;
      const timestamp = new Date().getTime();
      const renamedFile = `${timestamp}-${uuid.v4()}`;
      const data = await sharp(buffer).webp({ lossless: true }).toBuffer();
      try {
        const result = await uploadFile(data, fieldname, renamedFile);
        req.body.media.push(
          `${process.env.APP_URL}/api/v1/image/${result.key}`
        );
      } catch (error) {
        resolveError(req, res, error);
      }
    }
  }
  next();
};
