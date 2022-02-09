const Joi = require("joi");
const { errorResponse } = require("../Helpers/response");

exports.validateAnalytics = async (req, res, next) => {
  const { post_id } = req.body;
  const schema = Joi.object({
    post_id: Joi.number().required(),
  });

  await schema
    .validateAsync({ post_id })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};
