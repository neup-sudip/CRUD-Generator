const mongoose = require("mongoose");

const dburl =
  "mongodb://127.0.0.1:27017/CRUD?readPreference=primary&directConnection=true&ssl=false";

const db = () =>
  mongoose
    .connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log(`Connected to ${dburl}`);
    })
    .catch((err) => {
      console.log("error", err.message);
    });

module.exports = db;
