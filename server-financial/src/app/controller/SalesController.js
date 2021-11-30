import SalesService from '../../service/SalesService';

class SalesController {
  async storeSales(req, res) {
    let response;     
    try {
      response = await SalesService.storeSales(req.body, req.params);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(401).json(error);
    }
  }
  async getSalesDetails(req, res) {
    let response;      
    try {
      response = await SalesService.getSalesDetails();
      console.log(response)

      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no busca todas as venda'});
    }
  }
  async getSalesDetailsId(req, res) {
    let response;      
    try {
      response = await SalesService.getSalesDetailsId(req.params);
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
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca valor total vendas'});
    }
  }
  async updateSalesId(req, res) {
    let response;
    try {
      response = await SalesService.updateSalestId(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async deleteSalesId(req, res) {
    let response;     
    try {
      response = await SalesService.deleteSalesId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new SalesController();
