import Account from "../app/models/Account";
import Portion from "../app/models/Portion";

export default {
  // create uma nova parcela
  async storePortion(req, res) {
    try {
      let accounts_id = req;
      let { valor, numero_parcela, data_vencimento, pago } = res;

      const schema = Yup.object().shape({
        valor: Yup.string().required(),
        numero_parcela: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Complete todos os campos' });
      }

      const account = await Account.findByPk(accounts_id);

      if (!account) {
        return res.status(400).json({ error: 'Account not found' });
      }

      const NumeroParcelaExists = await Account.findByPk(accounts_id, {
        include: [
          {
            model: Portion,
            as: 'parcela',
            where: { numero_parcela: numero_parcela },
          },
        ],
      });

      if (NumeroParcelaExists) {
        return res
          .status(400)
          .json({ error: 'This installment number already exists.' });
      }

      const portion = await Portion.create({
        valor,
        numero_parcela,
        data_vencimento,
        pago,
        accounts_id,
      });

      return portion;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // busca conta por Id com todas as parcelas, com soma de todos os valores 
  async getPortionDetailsWithValouTotal(req, res) {
    try {
      let id = req;

      const portion = await Portion.findAndCountAll({
        where: { accounts_id: id },
        order: [['numero_parcela', 'ASC']],
      });

      const accounts = await Portion.findAll({ where: { accounts_id: id } });

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
      return { portion, total };
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
  // busca uma parcela por Id
  async getPortionDetailsId(req, res) {
    try {
      let id = req;

      let parcela = await Portion.findByPk(id);

      return parcela;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // atualiza parcela por Id
  async updatePortionId(req, res) {
    try {
      let id = req;
      let body = res

      const schema = Yup.object().shape({
        valor: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }
      const portion = await Portion.findByPk(id);

      await portion.update(body);

      return portion;
    } catch (error) {
      return res.status(400).json({ error: 'Erro...' });
    }
  },
  // excluir uma parcela por Id
  async deletePortionId(req, res) {
    let result = {}
    try {
      let id = req;
      const portion = await Portion.destroy({
        where: {
          id: id,
        },
      });

      if (!portion) {
        return res.status(400).json({ message: 'Account not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: portion}      
      return result;
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
}