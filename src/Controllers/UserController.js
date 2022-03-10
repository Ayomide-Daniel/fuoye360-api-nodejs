const { successResponse, errorResponse } = require("../Helpers/response");
const User = require("../../models/User");
const sharp = require("sharp");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const { relativeAt } = require("../Helpers/modifiers");
const {
  resolveError,
  slackNotification,
} = require("../Helpers/slack-notification");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.index = async (req, res) => {
  let user = req.user;
  user.relative_at = relativeAt(user.created_at);
  try {
    successResponse(res, 200, "User retreived successfully", {
      user,
    });
  } catch (error) {
    return resolveError(req, res, error);
  }
};

exports.store = async (req, res) => {
  const { full_name, username, bio, location, url, image, banner } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        full_name,
        username,
        bio,
        location,
        url,
        image,
        banner,
      },
      {
        new: true,
      }
    );

    successResponse(res, 200, "User updated successfully", {
      user,
    });
  } catch (error) {
    return resolveError(req, res, error);
  }
};

exports.findByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    let user = await User.findOne({ username })
      .populate({
        path: "broadcasts",
        populate: {
          path: "user",
        },
      })
      .lean();

    for (let broadcast of user.broadcasts) {
      broadcast = adulterateBroadcast(req, broadcast);
    }

    successResponse(res, 200, "User retreived successfully", {
      user,
    });
  } catch (error) {
    return resolveError(req, res, error);
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

const adulterateBroadcast = (req, broadcast) => {
  const user = req.user;
  let meta = {
    is_thread: false,
    _info: {
      count: 4,
      type: "likes",
      user: {
        _id: 4,
        full_name: "Dave",
      },
    },
    has_bookmarked: user.broadcast_bookmarks.includes(broadcast._id)
      ? true
      : false,
    has_retweeted: user.broadcast_retweets.includes(broadcast._id)
      ? true
      : false,
    has_liked: user.broadcast_likes.includes(broadcast._id) ? true : false,
  };
  broadcast.relative_at = relativeAt(broadcast.created_at);
  broadcast.meta = meta;
  return broadcast;
};
