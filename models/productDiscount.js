"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDiscount extends Model {
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
  ProductDiscount.init(
    {
      product_id: DataTypes.INTEGER,
      discount_count: DataTypes.INTEGER,
      discount_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ProductDiscount",
    }
  );
  return ProductDiscount;
};
