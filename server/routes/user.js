const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../error/catchAsync");

// 미들웨어
const { isLoggedIn } = require("../middleware");

// 컨트롤러
const users = require("../controllers/users");

router.post("/login", passport.authenticate("local"), users.login);

router.post("/register", catchAsync(users.register));

router.get("/mypage", isLoggedIn, catchAsync(users.mypage));

router.get("/logout", users.logout);

module.exports = router;
