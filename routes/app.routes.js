const express = require("express");
const { getHome } = require("../controller/homeController");
const { getAbout } = require("../controller/aboutController");
const router = express.Router();

router.get("/", getHome);
router.get("/about", getAbout);

module.exports = router;
