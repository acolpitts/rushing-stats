const express = require("express");
const morgan = require("morgan");
const { resolve } = require("path");

const footballRoutes = require("./routes/football.routes");
const MODE = process.env.NODE_ENV || "development";

// load env vars
if (MODE !== "development") {
  require("dotenv").config({ path: resolve(`./.env.${MODE}`) });
} else {
  require("dotenv").config();
}

// config
const PORT = process.env.PORT || 1337;
const DEBUG_MODE = process.env.DEBUG_MODE || false;

const db = require("./db");
const app = express();

// connect mongo db
db.connect();

// allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "public"));

// verbose logging
if (DEBUG_MODE) {
  app.use(morgan("tiny")); // combined for more detail
}

// endpoints
app.use(footballRoutes);

// catch-all
app.get("*", function (req, res) {
  res.json({
    status: "error",
    message: "Opps! That endpoint does not exist. Try: /api/v1/football",
  });
});

// server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`);
});

module.exports = server;
