const { uploadFile } = require("../../config/s3.config");
const sharp = require("sharp");
const uuid = require("uuid");
exports.validateAndUploadImage = async (req, res, next) => {
  const user_id = res.locals.user.id;
  req.body.media = [];
  for (const file of req.files) {
    const { buffer, fieldname } = file;
    const timestamp = new Date().getTime();
    const renamedFile = `${timestamp}-${uuid.v4()}.webp`;
    const data = await sharp(buffer).webp({ quality: 50 }).toBuffer();
    const result = await uploadFile(data, fieldname, renamedFile);
    console.log(result.key);
    req.body.media.push(result.key);
  }
  next();
};
