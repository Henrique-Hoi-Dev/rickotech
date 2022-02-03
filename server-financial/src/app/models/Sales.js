import Sequelize, { Model } from 'sequelize';

class Sales extends Model {
  static init(sequelize) {
    super.init(
      {
        financial_id: Sequelize.INTEGER,
        name_product: Sequelize.STRING,
        valor_product: Sequelize.DOUBLE,
        desconto: Sequelize.DOUBLE,
        valor_total: Sequelize.DOUBLE,
        status: Sequelize.BOOLEAN,
        tipo_pagamento: Sequelize.ENUM('AVISTA', 'PARCELADO'),
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'sales_id', as: 'products' });
    this.belongsTo(models.FinancialBox, { foreignKey: 'financial_id', as: 'financial' });
  }
}

export default Sales;
