module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('financeiros', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_pendente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_desconto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_parcela: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parcelas: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_parcela: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      produto_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('financeiros');
  },
};
