const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
// const Logger = require('./middleware/Logger')

dotenv.config({ path: "./.env" });
const app = express();

// app.use(Logger)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sync Sequelize
const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    //   console.log("Database dropped and re-sync successfully.");
});

require('./src/api')(app)

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
