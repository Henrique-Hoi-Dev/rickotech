import Account from '../models/Account';
import Portion from '../models/Portion';
// import * as Yup from 'yup';

class AccountController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Name is required' });
    // }

    // const AccountExist = await Account.findOne({
    //   where: { name: req.body.name },
    // });

    // if (AccountExist) {
    //   return res
    //     .status(400)
    //     .json({ error: 'That account name already exists.' });
    // }

    const accounts = await Account.create(req.body);

    return res.json(accounts);
  }
  async getAll(req, res) {
    try {
      const account = await Account.findAll({
        order: [['data_vencimento', 'ASC']],
        include: [
          {
            model: Portion,
            as: 'parcela',
            order: [['numero_parcela', 'ASC']],
            separate: true,
            attributes: [
              'id',
              'accounts_id',
              'valor',
              'numero_parcela',
              'data_vencimento',
              'pago',
            ],
          },
        ],
      });

      // const total = await Account.findAll({
      //   include: [
      //     {
      //       model: Portion,
      //       as: 'parcela',
      //       order: [['numero_parcela', 'ASC']],
      //       separate: true,
      //       attributes: ["id", 'valor','numero_parcela', 'accounts_id' ],
      //     },
      //   ],
      // })

      // const  valor = total.map(result => { 
      // const valor1 = parseInt(result.parcela[0].valor);
      //   return valor1
      // })
            
      // const totals = valor.reduce((acumulado, x) => {
      //   return acumulado + x;
      // });
      // console.log(totals)

      return res.status(200).json(account);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getById(req, res) {
    try {
      let { id } = req.params;

      let account = await Account.findByPk(id, {
        include: [
          {
            model: Portion,
            as: 'parcela',
            order: [['numero_parcela', 'ASC']],
            separate: true,
            attributes: [
              'id',
              'accounts_id',
              'valor',
              'numero_parcela',
              'data_vencimento',
              'pago',
            ],
          },
        ],
      });

      return res.status(200).json(account);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // card valor total das contas vencidas
  async getCardInfoOverdue(req, res) {
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: [
              'accounts_id',
              'valor',
              'data_vencimento',
            ],
          },
        ],
      });
      const dataAtual = new Date();
    
      const valid = accounts.filter(function (result) {
        if (result.dataValues.data_vencimento <= dataAtual) {
          if (result.dataValues.status === 'pendente')
          return result.dataValues;
        }
      });

      const contasVencidas = valid.map(function (result) {
        const parValor = result.parcela.map(function (par) {
          const valor = parseInt(par.dataValues.valor);
          return valor
        })
        const total = parValor.reduce((acumulado, x) => {
          return acumulado + x;
        });
        return total   
      });

      const totalgeral = contasVencidas.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(totalgeral);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // card valor total das contas
  async getCardInfoTotal(req, res) {
    try {
      const accounts = await Portion.findAll();

      const valid = accounts.filter(function (result) {
        return result.dataValues;
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // card valor total das contas pagas
  async getCardInfoPaid(req, res) {
    try {
      const accounts = await Portion.findAll();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == true) {
          return result.dataValues;
        }
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // card valor total das contas devendo
  async getCardInfoOwing(req, res) {
    try {
      const accounts = await Portion.findAll();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == false) {
          return result.dataValues;
        }
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  //contas vencidas
  async getOverdueAccount(req, res) {
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

      return res.status(200).json(valid);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // atualização da contas
  async updateAccount(req, res) {
    try {
      const { id } = req.params;

      const account = await Account.findByPk(id);

      await account.update(req.body);

      return res.json(account);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  // excluir contas
  async deleteAccount(req, res) {
    try {
      const { id } = req.params;
      const account = await Account.destroy({
        where: {
          id: id,
        },
      });

      if (!account) {
        return res.status(400).json({ message: 'Account not found' });
      }

      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
}
export default new AccountController();
