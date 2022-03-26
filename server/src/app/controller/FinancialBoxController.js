import FinancialBoxService from '../../service/FinancialBoxService'

class FinancialBoxController {
  async store(req, res) {
    let response;     
    response = await FinancialBoxService.store(req.body, req.params);
    return res.send(response);
  }
  async index(req, res) {
    let response;      
    response = await FinancialBoxService.index(req.params);
    return res.send(response);
  }
  async open(req, res) {
    let response;      
    response = await FinancialBoxService.open(req.params);
    return res.send(response);
  }
  async getId(req, res) {
    let response;      
    response = await FinancialBoxService.getId(req.params);
    return res.send(response);
  }
  async update(req, res) {
    let response;
    response = await FinancialBoxService.update(req.body, req.params);
    return res.send(response);
  }
}
export default new FinancialBoxController();
