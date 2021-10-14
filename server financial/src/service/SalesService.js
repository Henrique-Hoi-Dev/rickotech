import Product from "../app/models/Product";
import Sales from "../app/models/Sales";
import httpStatus from 'http-status-codes';

export default  {
  async storeSales(req, res) {
    let sales = req
    let product_id = res.product_id
    try {
      let { name, valor, desconto, tipo_pagamento, tipo_parcela, 
            parcela_valor, parcela_numero } = sales;

      const products = await Product.findByPk(product_id);

      if (!products) {
        return res.status(400).json({ menssage: 'User not found' });
      }

      const saleses = await Sales.create({ product_id, name, valor, desconto, 
          tipo_pagamento, tipo_parcela, parcela_valor, parcela_numero });

      return saleses;
    } catch (error) {
      return res.status(400).json(error.menssage);
    }
  },

  async getSalesDetails(req, res) {
    try {
      let sales = await Sales.findAll({
        attributes: [ 'id', 'product_id', 'name', 'valor', 'desconto', 
          'tipo_pagamento', 'tipo_parcela', 'parcela_valor', 'parcela_numero'],
        include: {
          model: Product,
          as: 'product',
          attributes: [ 'name', 'status', 'valor' ],
        },
      });

      return sales;
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async getSalesDetailsId(req, res) {
    try {
      let id = req.id

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

      if (!sales) {
        return res.status(400).json({ menssage: 'User not found' });
      }

      return sales;
    } catch (error) {
      return res.status(400).json(error.menssage);
    }
  },

  async updateSalestId(req, res) {
    try {
      let id = req.id;
      let sale = res

      const sales = await Sales.findByPk(id);
      const updated = await sales.update(sale);

      return updated;
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async deleteSalesId(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const saleses = await Sales.destroy({
        where: {
          id: id,
        },
      });

      if (!saleses) {
        return res.status(400).json({ message: 'adress not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: saleses}      
      return result
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
