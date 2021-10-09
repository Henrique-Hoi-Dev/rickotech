import Sales from '../models/Sales';
import Product from '../models/Product';

class SalesController {
  async store(req, res) {
    try {
      let { product_id } = req.params;
      let { 
            name, 
            valor, 
            desconto, 
            tipo_pagamento, 
            tipo_parcela, 
            parcela_valor, 
            parcela_numero } = req.body;

      const products = await Product.findByPk(product_id);

      if (!products) {
        return res.status(400).json({ error: 'User not found' });
      }

      const saleses = await Sales.create({
          product_id,
          name, 
          valor, 
          desconto, 
          tipo_pagamento, 
          tipo_parcela, 
          parcela_valor, 
          parcela_numero
      });

      return res.status(200).json(saleses);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getById(req, res) {
    try {
      let { id } = req.params;
      let sales = await Sales.findByPk(id, {
        attributes: [ 
          'id', 
          'product_id', 
          'name', 
          'valor', 
          'desconto', 
          'tipo_pagamento',
          'tipo_parcela',
          'parcela_valor',
          'parcela_numero'
        ],
        include: {
          model: Product,
          as: 'product',
          attributes: [ 
            'name', 
            'status',
            'valor' 
          ],
        },
      });

      return res.status(200).json(sales);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getAll(req, res) {
    try {
      let sales = await Sales.findAll({
        attributes: [ 
          'id', 
          'product_id', 
          'name', 
          'valor', 
          'desconto', 
          'tipo_pagamento',
          'tipo_parcela',
          'parcela_valor',
          'parcela_numero'
        ],
        include: {
          model: Product,
          as: 'product',
          attributes: [ 
            'name', 
            'status',
            'valor' 
          ],
        },
      });

      return res.status(200).json(sales);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const sales = await Sales.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'produto',
          attributes: ['id', 'name', 'preco'],
        },
      ],
    });

    let Updated = await sales.update(req.body);

    console.log('Updated com sucesso');
    return res.json(Updated);
  }
}

export default new SalesController();
