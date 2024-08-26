const express = require("express");
const { getHome } = require("../controller/homeController");
const { getAbout } = require("../controller/aboutController");
const {
  getSignup,
  registerUser,
  getLogin,
  postLogin,
  getDashboard,
  getLogout,
} = require("../controller/authController");
const { isAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/register", registerUser);
router.get("/dashboard", isAuth, getDashboard);
router.get("/logout", getLogout);
module.exports = router;
