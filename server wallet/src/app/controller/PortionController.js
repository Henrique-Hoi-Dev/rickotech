import * as Yup from 'yup';
import Portion from '../models/Portion';
import Account from '../models/Account';
import PortionService from '../../service/PortionService'

class PortionController {
  // create uma nova parcela
  async storePortion(req, res) {
    let response;     
    try {
      response = await PortionService.storePortion(req.params, req.body);
      console.log(response)
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria uma nova parcela'});
    }
  }
  // busca conta por Id com todas as parcelas, com soma de todos os valores 
  async getPortionDetailsWithValouTotal(req, res) {
    let response;      
    try {
      response = await PortionService.getPortionDetailsWithValouTotal(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca uma parcela por Id
  async getPortionDetailsId(req, res) {
    let response;      
    try {
      response = await PortionService.getPortionDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // atualiza parcela por Id
  async updatePortionId(req, res) {
    let response;      
    try {
      response = await PortionService.updatePortionId(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no atualizar'});
    }
  }
  // excluir uma parcela por Id
  async deletePortionId(req, res) {
    let response;      
    try {
      response = await PortionService.deletePortionId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir'});
    }
  }


  async store(req, res) {
    try {
      let { accounts_id } = req.params;
      let { valor, numero_parcela, data_vencimento, pago } = req.body;

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

      return res.status(200).json(portion);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getPortionListComIdConta(req, res) {
    try {
      let { id } = req.params;

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
      return res.status(200).json({ portion, total });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async getById(req, res) {
    try {
      let { id } = req.params;

      let parcela = await Portion.findByPk(id);

      return res.status(200).json(parcela);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async updatePortion(req, res) {
    try {
      const schema = Yup.object().shape({
        valor: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const { id } = req.params;

      const portion = await Portion.findByPk(id);

      await portion.update(req.body);

      return res.json(portion);
    } catch (error) {
      return res.status(400).json({ error: 'Erro...' });
    }
  }
  async deletePortion(req, res) {
    try {
      const { id } = req.params;
      const portion = await Portion.destroy({
        where: {
          id: id,
        },
      });

      if (!portion) {
        return res.status(400).json({ message: 'Account not found' });
      }

      return res.status(200).json(portion);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
}

export default new PortionController();
