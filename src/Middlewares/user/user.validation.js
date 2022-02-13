const Joi = require("joi");
const { errorResponse } = require("../../Helpers/response");

exports.validateStore = async (req, res, next) => {
  const { name, username, bio, location, url, media } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    bio: Joi.string(),
    location: Joi.string(),
    url: Joi.string().uri(),
    media: Joi.array(),
  });

  await schema
    .validateAsync({ name, username, bio, location, url, media })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};
