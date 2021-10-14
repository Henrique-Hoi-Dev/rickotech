import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        sales_id: Sequelize.INTEGER,
        valor: Sequelize.DOUBLE,
        desconto: Sequelize.DOUBLE,
        tipo_pagamento: Sequelize.ENUM('AVISTA', 'PARCELADO'),
        tipo_parcela: Sequelize.ENUM('PAGO', 'CARTAO-CREDITO', 'BOLETO'),
        parcela_valor: Sequelize.DOUBLE,
        parcela_numero: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Sales, { foreignKey: 'product_id', as: 'product' });
  }
}

export default Service;
