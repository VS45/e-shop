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
    const user = { name: name, email: email, password: hashedPassword };
    User.createUser(user, (error, result) => {
      if (error) {
        return res.render("error", { error: error, title: "Error Page" });
      }
      console.log(result);
      return res.redirect("/login");
    });
  } catch (error) {
    return res.render("error", { error: error, title: "Error Page" });
  }
};

exports.getLogin = (req, res) => {
  res.render("login", { title: "Login Page" });
};
exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  User.findByUsername(email, async (err, results) => {
    if (err) return res.render("error", { title: "Error Page", error: err });
    console.log(results);
    const isValid = await bcrypt.compare(password, results[0].password);
    if (isValid) {
      req.session.loggedin = true;
      req.session.username = email;
      res.redirect("/dashboard");
    } else {
      res.render("error", { error: "Wrong Password", title: "Error Page" });
    }
  });
};

exports.getDashboard = (req, res) => {
  if (req.session.loggedin) {
    res.render("dashboard", {
      username: req.session.username,
      title: "Dashboard Page",
    });
  } else {
    res.redirect("/login");
  }
};

exports.getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
