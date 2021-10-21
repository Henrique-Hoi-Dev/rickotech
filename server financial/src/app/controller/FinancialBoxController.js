import FinancialBoxService from '../../service/FinancialBoxService'

class FinancialBoxController {
  // create de um novo caixa 
  async storeFinancialBox(req, res) {
    let response;     
    try {
      response = await FinancialBoxService.storeFinancialBox(req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // busca todos os caixa
  async getsFinancialBoxDetails(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.getsFinancialBoxDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // busca um caixa por Id, incluindo os serviços e vendas vinculadas 
  async getsFinancialBoxDetailsId(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.getsFinancialBoxDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'erro na busca'});
    }
  }
  // atualizar os valores do caixa
  async updateFinancialBoxId(req, res) {
    let response;
    try {
      response = await FinancialBoxService.updateFinancialBoxId(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // esxlui um caixa por Id
  async deleteFinancialBoxId(req, res) {
    let response;     
    try {
      response = await FinancialBoxService.deleteFinancialBoxId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new FinancialBoxController();
