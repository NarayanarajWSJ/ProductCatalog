"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TotalDiscount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TotalDiscount.init(
    {
      price_above: DataTypes.FLOAT,
      price_below: DataTypes.FLOAT,
      discount_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "TotalDiscount",
    }
  );
  return TotalDiscount;
};
