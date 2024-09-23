'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itemCardapio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  itemCardapio.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    preco: DataTypes.FLOAT,
    fotoUrl: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'itemCardapio',
  });
  return itemCardapio;
};