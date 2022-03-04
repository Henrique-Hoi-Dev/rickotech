import FinancialBox from "../app/models/FinancialBox";
import Service from "../app/models/Service";
import Sales from "../app/models/Order";
import User from "../app/models/User";

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
            attributes: [ 'id', 'name' ]
          },
          {
            model: Service,
            as: 'service',
            attributes: [ 'id', 'name', 'price' ],
          },
          {
            model: Sales,
            as: 'order',
            attributes: [ 'id', 'financial_id', 'price_product' ],
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
          'value_open', 
          'value_total_sales', 
          'value_total_service',   
          'value_total', 
        ],
        include: [
          {
            model: User,
            as: 'user',
            attributes: [ 'id', 'name', 'company_position']
          },
          {
            model: Service,
            as: 'service',
            attributes: [ 'id', 'name', 'price', 'financial_id' ],
          },
          {
            model: Sales,
            as: 'order',
            attributes: [ 'id', 'financial_id', 'price_product' ],
          }
        ]
      });
      // busca valores total serviços
      const services = await Service.findAll({ where: { financial_id: financialId }})
      if (services.length > 0) {
        const validService = services.filter(function (result) {
          return result.dataValues;
        });
        const valueService = validService.map(function (result) {
          const valor = parseInt(result.dataValues.price);
          return valor
        })
        const totalService = valueService.reduce((acumulado, x) => {
          return acumulado + x;
        });

        const value_total_service = (totalService - 0)
        const caixa = {value_total_service }

        await financial.update(caixa)
      }
      // busca valores total de vendas
      const saleses = await Sales.findAll({ where: { financial_id: financialId }})
      if (saleses.length > 0) {
        const validSales = saleses.filter(function (result) {
          return result.dataValues;
        });
        const valueSales = validSales.map(function (result) {
          const valor = parseInt(result.dataValues.price_product);
          return valor
        })
        const totalSales = valueSales.reduce((acumulado, x) => {
          return acumulado + x;
        });

        const value_total_sales = (totalSales - 0)
        const caixa = { value_total_sales }

        await financial.update(caixa)
      } 

      const financialBox = await FinancialBox.findAll({ where: { id: financialId }})
      const valid = financialBox.filter(function (result) {
        return result.dataValues;
      });
      const valores = valid.map(function (result) {
        const valorSales = parseInt(result.dataValues.value_total_sales);
        const valorOpen = parseInt(result.dataValues.value_open);
        const valorService = parseInt(result.dataValues.value_total_service);

        const totalvalores =  valorOpen + valorService + valorSales

        return totalvalores;
      });
      const total = valores.reduce((acumulado, x) => {
        return acumulado + x;
      });      

      const value_total = (total || 0 )
      const caixa = { value_total }

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