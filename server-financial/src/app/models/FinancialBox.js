import Sequelize, { Model } from 'sequelize';

class FinancialBox extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        open_caixa: Sequelize.DATEONLY,
        close_caixa: Sequelize.DATEONLY,
        status: Sequelize.BOOLEAN,
        valor_open: Sequelize.DOUBLE,
        valor_sales_total: Sequelize.DOUBLE,
        valor_service_total: Sequelize.DOUBLE,
        valor_total: Sequelize.DOUBLE,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.Sales, { foreignKey: 'financial_id', as: 'saleses' });
    this.hasMany(models.Service, { foreignKey: 'financial_id', as: 'service' });
  }
}

export default FinancialBox;
