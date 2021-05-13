const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'development'
const sequelize = new Sequelize(dbConfig[env].DB, dbConfig[env].USER, dbConfig[env].PASSWORD, {
  host: dbConfig[env].HOST,
  dialect: dbConfig[env].dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig[env].pool.max,
    min: dbConfig[env].pool.min,
    acquire: dbConfig[env].pool.acquire,
    idle: dbConfig[env].pool.idle
  }
});
console.log(process.env.DB_NAME);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product')(sequelize, Sequelize);
db.totalDiscount = require('./totalDiscount')(sequelize, Sequelize);
db.productDiscount = require('./productDiscount')(sequelize, Sequelize);
db.cart = require('./cart')(sequelize, Sequelize);

module.exports = db;