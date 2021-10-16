module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('financial_boxes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      valor_sales_total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      valor_service_total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      valor_total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      open_caixa: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      close_caixa: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('financial_boxes');
  },
};
