const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./db");

db();

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/files", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.103:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    credentials: true,
  })
);

app.use("/api", indexRouter);

app.listen(5000, () => console.log("App running 5000"));

module.exports = app;
