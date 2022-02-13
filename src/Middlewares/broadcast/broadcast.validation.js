const Joi = require("joi");
const { errorResponse } = require("../../Helpers/response");

exports.validateStore = async (req, res, next) => {
  const { post_id, body, media } = req.body;
  const schema = Joi.object({
    post_id: Joi.number(),
    body: Joi.string().required(),
    media: Joi.array(),
  });

  await schema
    .validateAsync({ post_id, body, media })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};
