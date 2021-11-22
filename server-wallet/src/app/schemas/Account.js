import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_vencimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pendente', 'cancelado', 'pago'],
      defaultValue: 'pendente',
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
export const AccounModel = mongoose.model('Account', AccountSchema)
