require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This skips verification but should be handled properly for production
    }
  }
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