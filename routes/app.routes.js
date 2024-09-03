const express = require("express");
const multer = require("multer");
const path = require("path");
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
const { getUploadPage, postUpload } = require("../controller/fileupload");
const router = express.Router();

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("profilepicture");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/register", registerUser);
router.get("/dashboard", isAuth, getDashboard);
router.get("/logout", getLogout);
router.get("/upload", getUploadPage);
router.post("/upload", upload, postUpload);
module.exports = router;
