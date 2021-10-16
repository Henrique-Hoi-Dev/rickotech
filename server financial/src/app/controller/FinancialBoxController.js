import FinancialBoxService from '../../service/FinancialBoxService'

class FinancialBoxController {
  async storeFinancialBox(req, res) {
    let response;     
    try {
      response = await FinancialBoxService.storeFinancialBox(req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getsFinancialBoxDetails(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.getsFinancialBoxDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getsFinancialBoxDetailsId(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.getsFinancialBoxDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'erro na busca'});
    }
  }
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
