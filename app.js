const express = require("express");
const appRouter = require("./routes/app.routes");
const path = require("path");
const app = express();
const session = require("express-session");
const PORT = 8080;
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appRouter);
app.listen(PORT, () => {
  console.log(`server runninng at port ${PORT}`);
});
