import FinancialBox from "../app/models/FinancialBox";
import Sales from "../app/models/Sales";
import Service from "../app/models/Service";
import httpStatus from 'http-status-codes';

export default {
  // create de um novo caixa 
  async storeFinancialBox(req, res) {
    let financial = req;
    try {
      const createFinancialBox = await FinancialBox.create(financial);

      return createFinancialBox;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // busca todos os caixa
  async getsFinancialBoxDetails(req, res) {
    try {
      let financials = await FinancialBox.findAll({
        attributes: [ 'id', 'valor_sales_total', 'valor_service_total', 
                      'valor_total', 'open_caixa', 'close_caixa'],
        include: [
          {
            model: Sales,
            as: 'saleses',
            attributes: [ 'id', 'valor' ], 
          },
          {
            model: Service,
            as: 'service',
            attributes: [ 'name', 'id', 'valor' ],
          }
        ]
      });

      return financials;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // busca um caixa por Id, incluindo os serviços e vendas vinculadas 
  async getsFinancialBoxDetailsId(req, res) {
    let financialId = req.id
    try {
      const financial = await FinancialBox.findByPk(financialId, {
        attributes: [ 'id', 'valor_sales_total', 'valor_service_total', 
                      'valor_total', 'open_caixa', 'close_caixa'],
        include: [
          {
            model: Sales,
            as: 'saleses',
            attributes: [ 'id', 'valor' ], 
          },
          {
            model: Service,
            as: 'service',
            attributes: [ 'name', 'id', 'valor' ],
          }
        ]
      });
      const financialBox = await FinancialBox.findAll({ where: { id: financialId }})
      const valid = financialBox.filter(function (result) {
        return result.dataValues;
      });
      
      const valores = valid.map(function (result) {
        const valorSales = parseInt(result.dataValues.valor_sales_total);
        const valorService = parseInt(result.dataValues.valor_service_total);

        const totalvalores = valorSales + valorService

        return totalvalores;
      });
      const total = valores.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return {financial, total}
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // atualizar os valores do caixa
  async updateFinancialBoxId(req, res) {
    let financial = req
    let id = res.id

    try {
      const financialBox = await FinancialBox.findByPk(id);
      const financialUpdated = await financialBox.update(financial);

      return financialUpdated;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // esxlui um caixa por Id
  async deleteFinancialBoxId(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const financial = await FinancialBox.destroy({
        where: {
          id: id,
        },
      });

      if (!financial) {
        return res.status(400).json({ message: 'adress not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: financial}      
      return result
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}