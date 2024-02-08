const express = require("express");
const userTestApi = require("../controllers/userCtrl");

const userRoutes = express.Router();

userRoutes.get("/test", userTestApi);
module.exports = userRoutes;
