const User = require("../model/User");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || password === "") {
    return res.status(204).json({ message: "All fields are required" });
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
    res.json(error.message);
  }
});

module.exports = userRegisterCtrl;
