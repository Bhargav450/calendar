require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log("databaseUrl:::",process.env.DATABASE_URL)
const sequelize = new Sequelize(databaseUrl, {
    logging: false, // Disable logging to avoid exposing sensitive information,
    postgres: dialect
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    // Consider additional error handling here, such as retrying or notifying
  });

module.exports = { sequelize, QueryTypes };