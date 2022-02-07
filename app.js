const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
// const Logger = require('./middleware/Logger')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
dotenv.config({ path: "./.env" });
const app = express();

// app.use(Logger)

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(limiter);

//Sync Sequelize
const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
  //   console.log("Database dropped and re-sync successfully.");
});

// use it before all route definitions
app.use(cors({ origin: "http://localhost:3000" }));
require("./src/api")(app);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
