import ServiceService from '../../service/ServiceService'

class ServiceController {
  async store(req, res) {
    let response;     
    response = await ServiceService.store(req.body, req.params);
    return res.send(response);
  }
  async index(req, res) {
    let response;      
    response = await ServiceService.index(req.params);
    return res.status(200).send(response);
  }
  async getId(req, res) {
    let response;      
    response = await ServiceService.getId(req.params);
    return res.status(200).send(response);
  }
  async delete(req, res) {
    let response;     
    response = await ServiceService.delete(req.params);
    return res.status(200).send(response);
  }
}
export default new ServiceController();
