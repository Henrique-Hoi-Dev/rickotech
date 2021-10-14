import Sequelize, { Model } from 'sequelize';

class FinancialBox extends Model {
  static init(sequelize) {
    super.init(
      {
        sales_id: Sequelize.INTEGER,
        service_id: Sequelize.INTEGER,
        valor_sales_total: Sequelize.DECIMAL,
        valor_service_total: Sequelize.DECIMAL,
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
    this.belongsTo(models.Sales, { foreignKey: 'sales_id', as: 'sales' });
    this.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' });
  }
}

export default FinancialBox;
