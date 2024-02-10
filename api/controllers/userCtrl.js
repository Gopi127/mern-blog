const User = require("../model/User");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

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
    res.json(user);
  } catch (error) {
    next(error);
  }
});

const userLoginCtrl = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(422, "Email or Password is required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc; // Exclude the password from the response

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
});

module.exports = userRegisterCtrl;
module.exports = userLoginCtrl;
