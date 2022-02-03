const Joi = require("joi");
const { errorResponse } = require("../Helpers/response");

exports.validateLoginFields = async (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  schema
    .validateAsync({ email, password })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};

exports.validateRegisterFields = async (req, res, next) => {
  const { name, username, email, phone_number, password } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.number().required(),
    password: Joi.string().required().min(8),
  });

  schema
    .validateAsync({ name, username, email, phone_number, password })
    .then(() => {
      next();
    })
    .catch((err) => {
      errorResponse(res, 422, err.details[0].message, null);
    });
};
