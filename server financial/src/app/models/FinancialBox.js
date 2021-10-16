import Sequelize, { Model } from 'sequelize';

class FinancialBox extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_sales_total: Sequelize.DECIMAL,
        valor_service_total: Sequelize.DECIMAL,
        valor_total: Sequelize.DECIMAL,
        open_caixa: Sequelize.DATE,
        close_caixa: Sequelize.DATE
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
