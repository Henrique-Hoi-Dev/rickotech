import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        data_vencimento: Sequelize.DATE,
        status: Sequelize.ENUM('pendente', 'cancelado', 'pago'),
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Portion, { foreignKey: 'accounts_id', as: 'parcela' });
  }
}

export default Account;
