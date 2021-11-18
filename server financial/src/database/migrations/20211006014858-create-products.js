module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['EM-ESTOQUE','VENDIDO'],
        defaultValue: 'EM-ESTOQUE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_registro: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      altura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      largura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comprimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      peso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigo_barra: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('products');
  },
};
