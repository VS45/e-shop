const db = require("../data/config");

const User = {
  createUser: (user, callback) => {
    return db.query("INSERT INTO users SET ?", user, callback);
  },
  findByUsername: (email, callback) => {
    return db.query("SELECT * FROM users where email=? ", [email], callback);
  },
};

module.exports = User;
