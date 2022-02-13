const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../../config/jwt.config");
const { successResponse, errorResponse } = require("../Helpers/response");
const { User } = require("../../models");
const sharp = require("sharp");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.index = async (req, res) => {
  const user = res.locals.user;
  try {
    successResponse(res, 200, "User retreived successfully", {
      user,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.store = async (req, res) => {
  const { name, username, bio, location, url, media } = req.body;
  try {
    const user = await User.findOne({ where: { id: res.locals.user.id } });
    await user.update({
      name,
      username,
      bio,
      location,
      url,
      media: JSON.stringify(media),
    });
    await user.save();

    successResponse(res, 200, "User updated successfully", {
      user,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

const bufferAndUpload = async (file, res) => {
  const { buffer, originalname, mimetype, fieldname } = file;
  const timestamp = new Date().toISOString();
  const ref = `${timestamp}-${originalname}.webp`;
  const data = await sharp(buffer).webp({ quality: 20 }).toBuffer();
  const folderpath =
    fieldname === "profile-image"
      ? "fuoye360/user_profile_images"
      : "fuoye360/user_banner_images";
  const stream = cloudinary.uploader.upload_stream(
    { folder: folderpath },
    (error, result) => {
      if (error) {
        console.log(error);

        successResponse(res, 200, "Profile Images uploaded successfully", {
          url: result.secure_url,
        });
        // if (fieldname === "profile-image") {
        // } else {
        //   successResponse(res, 200, "Profile Banner uploaded successfully", {
        //     banner: result.secure_url,
        //   });
        // }
      }
    }
  );
  bufferToStream(data).pipe(stream);
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
