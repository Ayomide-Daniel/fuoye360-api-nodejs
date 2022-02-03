module.exports = {
  HOST: process.env.DB_HOST,
  DB: process.env.DB_DATABASE,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
