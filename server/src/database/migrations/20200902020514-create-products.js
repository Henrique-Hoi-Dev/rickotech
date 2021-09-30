module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
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
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      altura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dia_da_semana: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      horario: {
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
      codigo_de_barra: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      peso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_id: {
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
    return queryInterface.dropTable('products');
  },
};
