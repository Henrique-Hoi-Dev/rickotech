import * as Yup from 'yup';
import Financeiro from '../models/Financeiro';
import Produto from '../models/Product';

class FinanceiroController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tipo_pagamento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const venda = await Financeiro.create(req.body);

    return res.json(venda);
  }

  async getById(req, res) {
    try {
      let { id } = req.params;
      let venda = await Financeiro.findByPk(id, {
        include: {
          model: Produto,
          as: 'produto',
          attributes: ['id', 'name', 'preco'],
        },
      });

      return res.status(200).json(venda);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getAll(req, res) {
    try {
      let venda = await Financeiro.findAll({
        include: {
          model: Produto,
          as: 'produto',
          attributes: ['id', 'name', 'preco'],
        },
      });

      return res.status(200).json(venda);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const venda = await Financeiro.findByPk(id, {
      include: [
        {
          model: Produto,
          as: 'produto',
          attributes: ['id', 'name', 'preco'],
        },
      ],
    });

    let Updated = await venda.update(req.body);

    console.log('Updated com sucesso');
    return res.json(Updated);
  }
}

export default new FinanceiroController();
