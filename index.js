const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const dotenv = require('dotenv');
dotenv.config();

var productsRoutes = require('./routes/products.routes');
var totalDiscountsRoutes = require('./routes/totalDiscounts.routes');
var productDiscounts = require('./routes/productDiscounts.routes');
var cart = require('./routes/cart.routes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const db = require("./models");
db.sequelize.sync();

app.get("/", (request, response) => {
  response.json({ info: "Products API" });
});

app.use('/', productsRoutes);
app.use('/', totalDiscountsRoutes);
app.use('/', productDiscounts);
app.use('/', cart);

app.listen(port, () => {
  console.log(`App running on port ${port}. - ${process.env.NODE_ENV}`);
});
module.exports = app