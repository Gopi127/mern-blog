const express = require("express");
const userRegisterCtrl = require("../controllers/userCtrl");
const userLoginCtrl = require("../controllers/userCtrl");

const userRoutes = express.Router();

userRoutes.post("/signup", userRegisterCtrl);
userRoutes.post("/signin", userLoginCtrl);

module.exports = userRoutes;
