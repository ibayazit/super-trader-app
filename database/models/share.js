'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    static associate(models) {
      this.hasMany(models.ProcessLog, {
        foreignKey: 'shareId',
        onDelete: 'CASCADE'
      })
    }
  }
  Share.init({
    code: DataTypes.CHAR(3),
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE.UNSIGNED,
    quantity: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'Share',
  });

  return Share;
};