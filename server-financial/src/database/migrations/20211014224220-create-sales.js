module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products' , key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      financial_id: {
        type: Sequelize.INTEGER,
        references: { model: 'financial_boxes' , key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      desconto: {
        type: Sequelize.DOUBLE,
      },
      tipo_pagamento: {
        type: Sequelize.ENUM,
        values: ['AVISTA','PARCELADO'],
        defaultValue: 'AVISTA',
      },
      tipo_parcela: {
        type: Sequelize.ENUM,
        values: ['PAGO', 'CARTAO-CREDITO', 'BOLETO'],
        defaultValue: 'PAGO',
      },
      parcela_valor: {
        type: Sequelize.DOUBLE,
      },
      parcela_numero: {
        type: Sequelize.STRING,
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