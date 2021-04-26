require('dotenv').config();
const {Sequelize} = require('sequelize');

const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_DIALECT} = process.env;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  define: {
    timestamps: false
  }
});

db.authenticate()
  .then(() => console.log('connected to database...'))
  .catch((err) => console.log(`failed to connect to database. error: ${err}`));


module.exports = db;
