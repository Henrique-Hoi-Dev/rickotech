import Service from "../app/models/Service";
import FinancialBox from "../app/models/FinancialBox";
import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {
    try {
      let financial_id = res.id

      const { name, valor, data_serviço } = req;

      const financial = await FinancialBox.findByPk(financial_id);

      if (!financial) {
        return res.status(400).json({ menssage: 'caixa not found' });
      }

      const services = await Service.create({ financial_id, name, valor, data_serviço });

      return services;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async index(req, res) {
    try {
      let services = await Service.findAll({
        include: {
          model: FinancialBox,
          as: 'financial',
          attributes: [ 'id', 'valor_service_total', 'open_caixa', 'close_caixa' ],
        },
      });

      return services;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async getId(req, res) {
    let serviceId = req.id 
    try {
      let services = await Service.findByPk(serviceId, {
        attributes: [ 'name', 'valor', 'data_serviço'],
        include: {
          model: FinancialBox,
          as: 'financial',
          attributes: [ 'id', 'valor_service_total', 'open_caixa', 'close_caixa' ],
        },
      });
      return services;
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async getsServiceDetailsTotalValorId(req, res) {
    try {
      let financialId = req.financial_id 

      let services = await Service.findAll({ where : { financial_id: financialId },
        attributes: [ 'name', 'valor', 'data_serviço'],
        include: {
          model: FinancialBox,
          as: 'financial',
          attributes: [ 'id', 'valor_service_total', 'open_caixa', 'close_caixa' ],
        },
      });

      const validService = services.filter(function (result) {
        return result.dataValues;
      });
      const venciService = validService.map(function (result) {
      const valor = parseInt(result.dataValues.valor);
        return valor;
      });
      const totalService = venciService.reduce((acumulado, x) => {
        return acumulado + x;
      });
        
      return {services, totalService} 
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  async delete(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const service = await Service.destroy({
        where: {
          id: id,
        },
      });

      if (!service) {
        return res.status(400).json({ message: 'adress not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: service}      
      return result
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}