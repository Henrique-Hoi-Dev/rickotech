module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('portions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      accounts_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      numero_parcela: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      data_vencimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      pago: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    return queryInterface.dropTable('portions');
  },
};
