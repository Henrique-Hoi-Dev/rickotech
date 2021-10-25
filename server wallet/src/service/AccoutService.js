import Account from "../app/models/Account";
import Portion from "../app/models/Portion";
import httpStatus from 'http-status-codes';

export default {
  // create uma nova conta
  async storeAccount(req, res) {
    let propsAccount = req
    try {
      const createAccounts = await Account.create(propsAccount)

      return createAccounts;
    } catch (error) {
      return res.status(400).json(error)
    }
  }, 
  // busca todas as accounts
  async getAccountDetails(req, res) {
    try {
      const account = await Account.findAll({
        order: [['data_vencimento', 'ASC']],
        include: [
          {
            model: Portion,
            as: 'parcela',
            order: [['numero_parcela', 'ASC']],
            separate: true,
            attributes: [ 'id', 'accounts_id', 'valor', 'numero_parcela', 
                          'data_vencimento', 'pago' ],
          },
        ],
      });

      return account;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // busca uma conta por Id
  async getAccountDetailsId(req, res) {
    let id = req.id
    try {

      let account = await Account.findByPk(id, {
        include: [
          {
            model: Portion,
            as: 'parcela',
            order: [['numero_parcela', 'ASC']],
            separate: true,
            attributes: [ 'id', 'accounts_id', 'valor', 'numero_parcela',
                          'data_vencimento', 'pago'],
          },
        ],
      });

      return account;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // atualiza conta por Id
  async updateAccountId(req, res){
    let id = req.id
    let body = res
    try {
      const account = await Account.findByPk(id);

      await account.update(body);

      return account;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // excluir uma conta por Id
  async deleteAccountId(req, res) {
    let result = {}
    let id = req.id
    try {
      const account = await Account.destroy({
        where: {
          id: id,
        },
      });

      if (!account) {
        return res.status(400).json({ message: 'Account not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: account}      
      return result
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
  // busca todas as contas vencidas
  async getAccountOverdueDetails(req, res) {
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: ['numero_parcela', 'id', 'valor', 'pago']
          }
        ]
      });

      const dataAtual = new Date();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.data_vencimento <= dataAtual) {
          if (result.dataValues.status === 'pendente')
          return result.dataValues;
        }
      });

      return valid;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // busca todas as contas pagas
  async getAccountPaidDetails(req, res) {
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: ['numero_parcela', 'id', 'valor', 'pago']
          }
        ]
      });

      const valid = accounts.filter(function (result) {
        if (result.dataValues.status === 'pago') {
          return result.dataValues;
        }
      });

      return valid;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // busca todas as contas pendentes
  async getAccountPendingDetails(req, res) {
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: ['numero_parcela', 'id', 'valor', 'pago']
          }
        ]
      });

      const valid = accounts.filter(function (result) {
        if (result.dataValues.status === 'pendente') {
          return result.dataValues;
        }
      });

      return valid;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // busca todas as contas canceladas
  async getAccountCancelDetails(req, res) {
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: ['numero_parcela', 'id', 'valor', 'pago']
          }
        ]
      });

      const valid = accounts.filter(function (result) {
        if (result.dataValues.status === 'cancelado') {
          return result.dataValues;
        }
      });

      return valid;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
}