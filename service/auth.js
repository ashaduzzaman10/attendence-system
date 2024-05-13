const error = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("user already exist", 400);
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);
  if (!user) throw error("invalid credential", 400);

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw error("invalid credential", 400);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, "personal-key-value", { expiresIn: "2hr" });
};

module.exports = {
  loginService,
  registerService,
};
