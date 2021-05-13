module.exports = {
  development:{
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "Products_discount",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test:{
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "Products_discount_test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
 };