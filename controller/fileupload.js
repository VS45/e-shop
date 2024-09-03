exports.getUploadPage = (req, res) => {
  res.render("upload", {
    title: "File Upload",
    msg: "select file",
    file: undefined,
  });
};

exports.postUpload = (req, res) => {
  try {
    const file = req.file;
    res.render("upload", {
      title: "File Upload",
      msg: "successfully uploaded",
      file: file.filename,
    });
  } catch (err) {
    console.log(err);
  }
};
