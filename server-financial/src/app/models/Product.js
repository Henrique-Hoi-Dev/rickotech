import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        valor: Sequelize.DOUBLE,
        categoria: Sequelize.STRING,
        data_registro: Sequelize.DATEONLY,
        codigo_barra: Sequelize.STRING,
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
    this.hasMany(models.Sales, { foreignKey: 'product_id', as: 'sales' });
  }
}

export default Product;
