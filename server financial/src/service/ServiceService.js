import Service from "../app/models/Service";
import FinancialBox from "../app/models/FinancialBox";
import httpStatus from 'http-status-codes';

export default {
  // create de um serviço
  async storeService(req, res) {
    let service = req;
    let financial_id = res.id

    try {
      let { name, valor, data_serviço } = service;

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
  //busca todo os serviços registrados. Incluindo o caixa que o serviço faz parte
  async getsServiceDetails(req, res) {
    try {
      let services = await Service.findAll({
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
  // busca um serviço por Id. Incluindo o caixa que o serviço faz parte 
  async getsServiceDetailsId(req, res) {
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
  // busca um todos os serviços que estão registrando em um Caixa Id e trazendo valo total
  async getsServiceDetailsTotalValorId(req, res) {
    let financialId = req.financial_id 
    try {
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

      return {services, totalService};
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  // exclui serviços 
  async deleteServiceId(req, res) {
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