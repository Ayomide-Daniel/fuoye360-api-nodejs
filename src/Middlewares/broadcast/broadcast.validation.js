const Joi = require("joi");
const { errorResponse } = require("../../Helpers/response");

exports.validateStore = async (req, res, next) => {
  const { broadcast_id, body, media } = req.body;
  const schema = Joi.object({
    broadcast_id: Joi.string(),
    body: Joi.string().required(),
    media: Joi.array(),
  });

  await schema
    .validateAsync({ broadcast_id, body, media })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};

exports.validateDelete = async (req, res, next) => {
  const { broadcast_id } = req.body;
  const schema = Joi.object({
    broadcast_id: Joi.string(),
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

exports.validateUser = async (req, res, next) => {
  // console.log(req);
  const { user_id } = req.params;
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
