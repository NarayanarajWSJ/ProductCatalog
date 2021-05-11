module.exports = {
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
 };