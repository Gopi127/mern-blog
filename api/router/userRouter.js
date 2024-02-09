const express = require("express");
const userRegisterCtrl = require("../controllers/userCtrl");

const userRoutes = express.Router();

userRoutes.post("/signup", userRegisterCtrl);

module.exports = userRoutes;
