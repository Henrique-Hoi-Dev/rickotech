module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      financial_id: {
        type: Sequelize.INTEGER,
        references: { model: 'financial_boxes' , key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_product: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      desconto: {
        type: Sequelize.DOUBLE,
      },
      valor_total: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tipo_pagamento: {
        type: Sequelize.ENUM,
        values: ['AVISTA','PARCELADO'],
        defaultValue: 'AVISTA',
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
    return queryInterface.dropTable('sales');
  },
};
