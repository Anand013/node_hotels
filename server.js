//Imports
const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
//useAge
const app = express();
//use of body parser
app.use(bodyParser.json());

//APIs
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

//Port
app.listen(3000, () => {
  console.log("Server is listen port 3000");
});
