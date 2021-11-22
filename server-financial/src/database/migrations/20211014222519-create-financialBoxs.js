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
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      valor_service_total: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      valor_total: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      open_caixa: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      close_caixa: {
        type: Sequelize.DATEONLY,
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
