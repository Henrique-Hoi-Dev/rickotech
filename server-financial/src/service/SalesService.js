import Product from "../app/models/Product";
import Sales from "../app/models/Sales";
import httpStatus from 'http-status-codes';
import FinancialBox from "../app/models/FinancialBox";

export default  {
  // create uma nova venda 
  async storeSales(req, res) {
    let sales = req
    let product_id = res.product_id

    try {
      let { financial_id, name, valor, desconto, tipo_pagamento, tipo_parcela, 
            parcela_valor, parcela_numero } = sales;

      const products = await Product.findByPk(product_id);
      if (!products) {
        return res.status(401).json({ menssage: 'Product not found' });
      }

      const SalesProductExist = await Sales.findOne({
        where: { product_id: product_id },
      });
      if (SalesProductExist) {
        return res.status(400).json({ message: 'Já existe uma venda.' });
      }
      
      const financialBox = await FinancialBox.findByPk(financial_id);
      if (!financialBox) {
        return res.status(400).json({ menssage: 'Financial not found' });
      }

      if (desconto >= 0) {
        const porcent = (valor / 100) 
        const descont = (porcent * desconto)
        const valor_total = valor - descont 
      
        console.log(valor_total)
      
        const saleses = await Sales.create({product_id, financial_id, name, valor, 
          desconto, valor_total, tipo_pagamento, tipo_parcela, parcela_valor, 
          parcela_numero }); 

        return saleses
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  //busca todas as vendas, com os prudotos e caixa inclusos 
  async getSalesDetails(req, res) {
    try {
      let sales = await Sales.findAll({
        attributes: [ 'id', 'product_id', 'financial_id', 'name', 'valor', 
        'valor_total', 'desconto', 'tipo_pagamento', 'tipo_parcela', 
        'parcela_valor', 'parcela_numero'],
          include: [
            // {
            //   model: Product,
            //   as: 'product',
            //   attributes: [ 'name', 'status', 'valor' ],
            // },
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
  // busca uma venda por Id, com os prudotos e caixa inclusos
  async getSalesDetailsId(req, res) {
    try {
      let id = req.id

      let salesId = await Sales.findByPk(id, {
        attributes: [ 'id', 'product_id', 'financial_id', 'name', 'valor', 
        'valor_total', 'desconto', 'tipo_pagamento', 'tipo_parcela', 
        'parcela_valor', 'parcela_numero'],
        include: [
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
    let financialId = req.financial_id 
    try {
      let saleses = await Sales.findAll({ where : { financial_id: financialId },
        attributes: [ 'id', 'product_id', 'name', 'valor', 'valor_total', 'desconto', 
        'tipo_pagamento', 'tipo_parcela', 'parcela_valor', 'parcela_numero' ],
          include: [
            // {
            //   model: Product,
            //   as: 'product',
            //   attributes: [ 'name', 'status', 'valor' ],
            // },
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

      return {saleses, totalSales};
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // faz atualização de um venda 
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
  // exclui uma venda por id
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
