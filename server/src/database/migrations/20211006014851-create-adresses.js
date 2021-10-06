module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adresses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cep: {
        type: Sequelize.STRING,
        unique: true,
      },
      logradouro: {
        type: Sequelize.STRING,
        unique: true,
      },
      complemento: {
        type: Sequelize.STRING,
        unique: true,
      },
      numero: {
        type: Sequelize.DECIMAL,
        unique: true,
      },
      bairro: {
        type: Sequelize.STRING,
        unique: true,
      },
      cidade: {
        type: Sequelize.STRING,
        unique: true,
      },
      uf: {
        type: Sequelize.STRING,
        unique: true,
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
    return queryInterface.dropTable('adresses');
  },
};
