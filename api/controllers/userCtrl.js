const User = require("../model/User");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");

const userRegisterCtrl = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || password === "") {
    next(errorHandler(400, "Missing data"));
  }

  const hashPassword = await bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.json("Sing up successfull");
  } catch (error) {
    next(error);
  }
});

module.exports = userRegisterCtrl;
