const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    static associate(models) {
    }
  };

  Tax.init({
    state:{
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Tax',
    tableName: 'tax'
  });
  return Tax;
};