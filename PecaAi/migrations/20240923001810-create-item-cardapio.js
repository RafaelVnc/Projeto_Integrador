'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('itemCardapio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      preco: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      fotoUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('itemCardapio');
  }
};