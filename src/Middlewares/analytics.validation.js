const Joi = require("joi");
const { errorResponse } = require("../Helpers/response");

exports.validateAnalytics = async (req, res, next) => {
  const { broadcast_id } = req.body;
  const schema = Joi.object({
    broadcast_id: Joi.string().required(),
  });

  await schema
    .validateAsync({ broadcast_id })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};

exports.validateFollow = async (req, res, next) => {
  const { user_id } = req.body;
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });

  await schema
    .validateAsync({ user_id })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};
