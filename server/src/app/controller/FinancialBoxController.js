import FinancialBoxService from '../../service/FinancialBoxService'

class FinancialBoxController {
  async store(req, res) {
    let response;     
    try {
      response = await FinancialBoxService.store(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({ error: 'Error in creating box!' });
    }
  }
  async index(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.index();
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async getId(req, res) {
    let response;      
    try {
      response = await FinancialBoxService.getId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async update(req, res) {
    let response;
    try {
      response = await FinancialBoxService.update(req.body, req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
}
export default new FinancialBoxController();
