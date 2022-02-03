const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
// const Logger = require('./middleware/Logger')

dotenv.config({ path: "./.env" });
const app = express();

// app.use(Logger)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res)=> {
//     res.render('index')
// })

/**
 * Users API routes
 */
// app.use('/api/todos', require('./routes/api/todo'))

//Sync Sequelize
const db = require("./src/models/Db");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database dropped and re-sync successfully.");
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
