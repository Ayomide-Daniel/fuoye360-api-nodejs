const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const connectDB = require("./config/mongo.config");
const morgan = require("morgan");
const { getFile } = require("./config/s3.config");

// const Logger = require('./middleware/Logger')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

dotenv.config({ path: "./.env" });

const app = express();

/**
 * Logger
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(limiter);

/**
 * Connect DB
 */
connectDB();

// use it before all route definitions
app.use(
  cors({
    origin: ["http://localhost:3000", "https://broadcast.fuoye360.com"],
  })
);

require("./src/api")(app);

//  use alternate localhost and the port Heroku assigns to $PORT
const host = "0.0.0.0";
const port = process.env.PORT || 5000;

app.listen(port, host, function () {
  console.log("Server started.......");
});

// app.listen(process.env.PORT || 5000, function () {
//   console.log(
//     "Express server listening on port %d in %s mode",
//     this.address().port,
//     app.settings.env
//   );
// });
