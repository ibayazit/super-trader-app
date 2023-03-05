'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProcessLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProcessLog.init({
    process: DataTypes.STRING,
    code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    shareId: DataTypes.INTEGER,
    purchasePrice: DataTypes.DOUBLE.UNSIGNED,
    quantity: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'ProcessLog',
  });
  return ProcessLog;
};