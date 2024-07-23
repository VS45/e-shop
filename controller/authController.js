const bcrypt = require("bcryptjs");
const User = require("../model/user");

exports.getSignup = (req, res) => {
  res.render("signup", { title: "Sign up Page" });
};
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log("HashedPassword!", hashedPassword);
    console.log("Email:", email);
    console.log("Name: ", name);
    res.redirect("/");
  } catch (error) {
    res.render("error", { error: error, title: "Error Page" });
  }
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  User.findByUsername(email, (err, result) => {
    if (err) return res.render("error", { title: "Error Page", error: err });
    console.log(result);
  });
  /*  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) throw err;
        if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
            res.send('Incorrect username or password');
        } else {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/dashboard');
        }
    }); */
};

/* app.get("/dashboard", (req, res) => {
  if (req.session.loggedin) {
    res.render("dashboard", { username: req.session.username });
  } else {
    res.send("Please login to view this page!");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
}); */
