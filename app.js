const express = require("express");
const bodyParser = require("body-parser");
const appRouter=require('./routes/app.routes')
const path = require("path");
const app = express();
const PORT = 8080;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(appRouter)
app.listen(PORT, () => {
  console.log(`server runninng at port ${PORT}`);
});
