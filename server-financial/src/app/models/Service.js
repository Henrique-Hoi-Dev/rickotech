import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        financial_id: Sequelize.INTEGER,
        name: Sequelize.DECIMAL,
        valor: Sequelize.DECIMAL,
        data_serviço: Sequelize.DATE
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.FinancialBox, { foreignKey: 'financial_id', as: 'financial' });
  }
}

export default Service;
