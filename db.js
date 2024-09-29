const mongoose = require("mongoose");

const mongodbURL = "mongodb://localhost:27017/hotels";

//Setup connection

mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongodb Server");
});

db.on("error", (err) => {
  console.log("Some error occur in Mongodb server", err);
});

db.on("disconnected", () => {
  console.log("Mongodb server is disconnected");
});

module.exports = db;
