import FinancialBox from "../app/models/FinancialBox";
import Service from "../app/models/Service";
import Sales from "../app/models/Sales";
import User from "../app/models/User";
import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {
    try {
      let { user_id } = res
      const { 
        open_caixa, 
        close_caixa,
        valor_open, 
        valor_total, 
        valor_service_total, 
        valor_sales_total 
      } = req

      const createFinancialBox = await FinancialBox.create({
        user_id, 
        open_caixa,
        valor_open, 
        close_caixa, 
        valor_total, 
        valor_service_total, 
        valor_sales_total 
      });

      return createFinancialBox;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async index(req, res) {
    try {
      let financials = await FinancialBox.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'cargo']
          },
          {
            model: Service,
            as: 'service',
            attributes: [ 'name', 'id', 'valor' ],
          },
          {
            model: Sales,
            as: 'saleses',
            attributes: [ 'id', 'financial_id', 'valor_product' ],
          }
        ]
      });

      return financials;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async getId(req, res) {
    try {
      let financialId = req.id

      const financial = await FinancialBox.findByPk(financialId, {
        attributes: [ 
          'id', 
          'open_caixa', 
          'close_caixa',
          'status',
          'valor_open', 
          'valor_sales_total', 
          'valor_service_total',   
          'valor_total', 
        ],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'cargo']
          },
          {
            model: Service,
            as: 'service',
            attributes: [ 'name', 'id', 'valor', 'financial_id' ],
          },
          {
            model: Sales,
            as: 'saleses',
            attributes: [ 'id', 'financial_id', 'valor_product' ],
          }
        ]
      });
      // busca valores total serviços
      const services = await Service.findAll({ where: { financial_id: financialId }})
      console.log(services.length)
      if (services.length > 0) {
        const validService = services.filter(function (result) {
          return result.dataValues;
        });
        const valueService = validService.map(function (result) {
          const valor = parseInt(result.dataValues.valor);
          return valor
        })
        const totalService = valueService.reduce((acumulado, x) => {
          return acumulado + x;
        });

        const valor_service_total = (totalService - 0)
        const caixa = {valor_service_total }

        await financial.update(caixa)
      }

      // busca valores total de vendas
      const saleses = await Sales.findAll({ where: { financial_id: financialId }})
      console.log(saleses.length)
      if (saleses.length > 0) {
        const validSales = saleses.filter(function (result) {
          return result.dataValues;
        });
        const valueSales = validSales.map(function (result) {
          const valor = parseInt(result.dataValues.valor_product);
          return valor
        })
        const totalSales = valueSales.reduce((acumulado, x) => {
          return acumulado + x;
        });

        const valor_sales_total = (totalSales - 0)
        const caixa = { valor_sales_total }

        await financial.update(caixa)
      } 

      const financialBox = await FinancialBox.findAll({ where: { id: financialId }})
      const valid = financialBox.filter(function (result) {
        return result.dataValues;
      });
      const valores = valid.map(function (result) {
        const valorSales = parseInt(result.dataValues.valor_sales_total);
        const valorOpen = parseInt(result.dataValues.valor_open);
        const valorService = parseInt(result.dataValues.valor_service_total);

        const totalvalores =  valorOpen + valorService + valorSales

        return totalvalores;
      });
      const total = valores.reduce((acumulado, x) => {
        return acumulado + x;
      });      
      console.log(total)
      const valor_total = (total - 0)
      const caixa = { valor_total }

      await financial.update(caixa)

      return financial
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async update(req, res) {
    try {
      const financialBox = await FinancialBox.findByPk(res.id);

      const { close_caixa, status } = req

      await financialBox.update({
        status, 
        close_caixa  
      });

      return financialBox;
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}