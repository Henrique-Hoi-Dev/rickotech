import FinancialBoxService from '../../service/FinancialBoxService'

class FinancialBoxController {
  async storeFinancialBox(req, res) {
    let response;     
    try {
      response = await FinancialBoxService.store(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getsFinancialBoxDetails(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getsFinancialBoxDetailsId(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'erro na busca'});
    }
  }
  async updateFinancialBoxId(req, res) {
    let response;
    try {
      response = await FinancialBoxService.update(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new FinancialBoxController();
