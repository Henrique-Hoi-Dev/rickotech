import Product from "../app/models/Product";
import Order from "../app/models/Order";
import httpStatus from 'http-status-codes';
import FinancialBox from "../app/models/FinancialBox";

export default  {
  async store(req, res) {
    try {
      let { 
        financial_id, 
        name_product, 
        valor_product, 
        desconto, 
        status,
        tipo_pagamento 
      } = req;

      const financialBox = await FinancialBox.findByPk(financial_id);
      if (!financialBox) {
        return res.status(400).json({ menssage: 'Financial not found' });
      }

      if (desconto >= 0) {
        const porcent = (valor_product / 100) 
        const descont = (porcent * desconto)
        const valor_total = valor_product - descont 
        
        if (status === true) {
          const saleses = await Order.create({
            financial_id, 
            name_product, 
            valor_product, 
            desconto, 
            status,
            valor_total, 
            tipo_pagamento
          }); 
  
          const { id } = saleses
  
          const salesProduct = await Product.findByPk(req.product_id)
          await salesProduct.update({ sales_id: id })
  
          return saleses
        }

        if (status === false) { 
          const salesProduct = await Product.findByPk(req.product_id)
          const salesUp = await salesProduct.update({ sales_id: req.sales_id })

          return salesUp
        }
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async index(req, res) {
    try {
      let sales = await Order.findAll({
          attributes: [ 
            'id', 
            'name_product', 
            'valor_product', 
            'desconto', 
            'valor_total',
            'status' 
          ],
          include: [
            {
              model: Product,
              as: 'products',
              attributes: [ 'name', 'categoria', 'valor' ],
            },
            {
              model: FinancialBox,
              as: 'financial',
              attributes: [ 'id', 'valor_sales_total', 'valor_service_total', 
                            'valor_total', 'open_caixa', 'close_caixa'],
            }
          ],
      });

      return sales;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async getId(req, res) {
    try {
      let id = req.id

      let salesId = await Sales.findByPk(id, {
        attributes: [ 
          'id', 
          'name_product', 
          'valor_product', 
          'desconto', 
          'valor_total',
          'status' 
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [ 'id', 'name', 'categoria', 'valor' ],
          },
          {
            model: FinancialBox,
            as: 'financial',
            attributes: [ 'id', 'valor_sales_total', 'valor_service_total', 
                          'valor_total', 'open_caixa', 'close_caixa'],
          }
        ],
      });

      return salesId;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // busca uma  venda por caixa Id que esta vinculada, inclundo produto e dados do caixa e valor total 
  async getsSalesDetailsTotalValorId(req, res) {
    try {
      let financialId = req.financial_id 

      let saleses = await Order.findAll({ where : { financial_id: financialId },
          include: [
            {
              model: Product,
              as: 'product',
              attributes: [ 'name', 'status', 'valor' ],
            },
            {
              model: FinancialBox,
              as: 'financial',
              attributes: [ 'id', 'valor_sales_total', 'valor_service_total', 
                            'valor_total', 'open_caixa', 'close_caixa'],
            }
          ],
      });

      const validSales = saleses.filter(function (result) {
        return result.dataValues;
      });
      const venciSales = validSales.map(function (result) {
      const valor = parseInt(result.dataValues.valor_total);
        return valor;
      });
      const totalSales = venciSales.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return {saleses, totalSales}
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async delete(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const saleses = await Order.destroy({
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
