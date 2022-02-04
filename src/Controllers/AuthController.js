const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../../config/jwt.config");
const { successResponse, errorResponse } = require("../Helpers/response");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../../models");

exports.registerController = async (req, res) => {
  const { name, username, email, phone_number, password } = req.body;

  try {
    const user = await registerUser(
      name,
      username,
      email,
      phone_number,
      password
    );
    const token = await generateToken(user);
    successResponse(res, 200, "User regristration successful", {
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 422, error.errors[0].message, null);
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    const token = await generateToken(user);
    successResponse(res, 200, "User login successful", { user, token });
  } catch (error) {
    errorResponse(res, 422, error, null);
  }
};

const registerUser = async (name, username, email, phone_number, password) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  const data = {
    name,
    username,
    email,
    phone_number,
    password: hash,
  };

  return await User.create(data);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw "Your credentials are incorrect!";
  }
  const checkPwd = await bcrypt.compare(password, user.password);
  if (checkPwd) {
    return user;
  }
  throw "Your credentials are incorrect!";
};

const generateToken = async (user) => {
  return await jwt.sign(
    {
      user,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
};
