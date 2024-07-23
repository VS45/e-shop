const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your password",
  database: "onlineshop",
});

module.exports = db;
