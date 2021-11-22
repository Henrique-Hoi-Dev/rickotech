import mongoose from 'mongoose'

const PortionSchema = new mongoose.Schema(
  {
    accounts_id: {
      type: Sequelize.INTEGER,
      references: { model: 'accounts', key: 'id' },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    valor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_vencimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    numero_parcela: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    pago: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);
export const PortionModel = mongoose.model('Portion', PortionSchema)
