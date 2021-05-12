"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductDiscount.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "Product",
      });
    }
  }
  Cart.init(
    {
      product_id: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      discount_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
