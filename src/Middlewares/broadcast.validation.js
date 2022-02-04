const Joi = require("joi");
const { errorResponse } = require("../Helpers/response");

exports.validateStore = async (req, res, next) => {
  const { user_id, post_id, body, media } = req.body;
  const schema = Joi.object({
    user_id: Joi.number().required(),
    post_id: Joi.number(),
    body: Joi.string().required(),
    media: Joi.array(),
  });

  await schema
    .validateAsync({ user_id, post_id, body, media })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};
