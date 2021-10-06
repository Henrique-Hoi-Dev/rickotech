import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        categoria: Sequelize.STRING,
        altura: Sequelize.STRING,
        largura: Sequelize.STRING,
        comprimento: Sequelize.STRING,
        codigo_barra: Sequelize.STRING,
        peso: Sequelize.STRING,
        valor: Sequelize.STRING,
        descricao: Sequelize.STRING,
        dia_semana: Sequelize.STRING,
        horario: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Product;
