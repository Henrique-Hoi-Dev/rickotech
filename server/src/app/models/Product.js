import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_images: { type: Sequelize.ARRAY(Sequelize.JSON), defaultValue: [] },
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        quantity: Sequelize.DOUBLE,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'product_id', as: 'order' });
  }
}

export default Product;
