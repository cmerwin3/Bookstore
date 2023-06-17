const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models){
    }
  };
  
  Book.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    author_lastname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    author_firstname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    synopsis: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'book'
  });
  return Book;
};