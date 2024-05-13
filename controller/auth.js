const { loginService, registerService } = require("../service/auth");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "invalid data",
    });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json({
      message: "user created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });
    return res.status(200).json({
      message: "login successfully done",
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginController,
  registerController,
};
