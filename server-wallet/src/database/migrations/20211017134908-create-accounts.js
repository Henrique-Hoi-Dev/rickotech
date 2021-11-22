module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_vencimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pendente', 'cancelado', 'pago'],
        defaultValue: 'pendente'
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
    return queryInterface.dropTable('accounts');
  },
};
