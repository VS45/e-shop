const express = require("express");
const { getHome } = require("../controller/homeController");
const { getAbout } = require("../controller/aboutController");
const {
  getSignup,
  registerUser,
  getLogin,
  postLogin,
} = require("../controller/authController");
const router = express.Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/register", registerUser);
module.exports = router;
