import Sequelize, { Model } from 'sequelize';

class FinancialBox extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_sales_total: Sequelize.DOUBLE,
        valor_service_total: Sequelize.DOUBLE,
        valor_total: Sequelize.DOUBLE,
        open_caixa: Sequelize.DATEONLY,
        close_caixa: Sequelize.DATEONLY
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Sales, { foreignKey: 'financial_id', as: 'saleses' });
    this.hasMany(models.Service, { foreignKey: 'financial_id', as: 'service' });
  }
}

export default FinancialBox;
