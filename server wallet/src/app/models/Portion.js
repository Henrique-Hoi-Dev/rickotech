import Sequelize, { Model } from 'sequelize';

class Portion extends Model {
  static init(sequelize) {
    super.init(
      {
        accounts_id: Sequelize.INTEGER,
        valor: Sequelize.STRING,
        numero_parcela: Sequelize.DECIMAL,
        data_vencimento: Sequelize.DATE,
        pago: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Account, {
      foreignKey: 'accounts_id',
      as: 'account',
    });
  }
}

export default Portion;
