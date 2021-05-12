const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product')(sequelize, Sequelize);
db.totalDiscount = require('./totalDiscount')(sequelize, Sequelize);
db.productDiscount = require('./productDiscount')(sequelize, Sequelize);
db.cart = require('./cart')(sequelize, Sequelize);

module.exports = db;