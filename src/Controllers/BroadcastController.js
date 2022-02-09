// const { aws, S3_BUCKET } = require("../../config/aws.config");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { successResponse, errorResponse } = require("../Helpers/response");
const { Broadcast, User } = require("../../models");
const { Op } = require("sequelize");
const sharp = require("sharp");
const { Readable } = require("stream");

exports.store = async (req, res) => {
  const { post_id, body, media } = req.body;
  const user_id = res.locals.user.id;
  try {
    const broadcast = await createTweet(user_id, post_id, body, media);

    successResponse(res, 200, "Broadcast created successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.index = async (req, res) => {
  try {
    const broadcasts = await getTweets();

    successResponse(res, 200, "Broadcasts retrieved successfully", broadcasts);
  } catch (error) {
    console.error(error);
    errorResponse(res, 422, error, null);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body;
  try {
    const broadcast = await deleteTweet(id);
    successResponse(res, 200, "Broadcast deleted successfully", broadcast);
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.uploadImage = async (req, res) => {
  req.files.forEach(async (file) => {
    const { buffer, originalname, mimetype } = file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.webp`;
    const data = await sharp(buffer).webp({ quality: 20 }).toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "fuoye360/broadcast_images" },
      (error, result) => {
        if (error) {
          return errorResponse(res, 500, err, null);
        }
        return successResponse(
          res,
          200,
          "Broadcast Image uploaded successfully",
          { url: result.secure_url }
        );
      }
    );
    bufferToStream(data).pipe(stream);
    /*
    const s3 = new aws.S3();
    // const fileName = req.query["file-name"];
    // const fileType = req.query["file-type"];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: ref,
      Expires: 60,
      ContentType: mimetype,
      ACL: "public-read",
    };

    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        return errorResponse(res, 422, err, null);
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${ref}`,
      };
      return successResponse(
        res,
        200,
        "Broadcast Image uploaded successfully",
        returnData
      );
    });
    */
  });
};
const createTweet = (user_id, post_id, body, media) => {
  const data = {
    user_id,
    post_id,
    body,
    media,
  };

  return Broadcast.create(data);
};

const getTweets = async () => {
  return await Broadcast.findAll({
    include: {
      model: User,
      attributes: { exclude: ["password", "email_verified_at"] },
    },
  });
};

const deleteTweet = (id) => {
  return Broadcast.destroy({ where: { id } });
};

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};
