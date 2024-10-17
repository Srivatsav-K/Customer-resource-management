const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const CONNECTION_URI = encodeURIComponent(process.env.MONGODB_URI);

const configDB = () => {
  mongoose
    .connect(CONNECTION_URI)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log("error connecting to db", err);
    });
};

module.exports = configDB;
