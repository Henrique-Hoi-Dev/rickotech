import SalesService from '../../service/SalesService';

class SalesController {
  async storeSales(req, res) {
    let response;     
    try {
      response = await SalesService.store(req.body, req.params);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getSalesDetails(req, res) {
    let response;      
    try {
      response = await SalesService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no busca todas as venda'});
    }
  }
  async getSalesDetailsId(req, res) {
    let response;      
    try {
      response = await SalesService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getsSalesDetailsTotalValorId(req, res) {
    let response;      
    try {
      response = await SalesService.getsSalesDetailsTotalValorId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async deleteSalesId(req, res) {
    let response;     
    try {
      response = await SalesService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new SalesController();
