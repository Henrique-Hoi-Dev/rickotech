import ServiceService from '../../service/ServiceService'

class ServiceController {
  async store(req, res) {
    let response;     
    try {
      response = await ServiceService.store(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({ error: 'Error creating a new service!'});
    }
  }
  async index(req, res) {
    let response;      
    try {
      response = await ServiceService.index();
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async getId(req, res) {
    let response;      
    try {
      response = await ServiceService.getId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async getsServiceDetailsTotalValorId(req, res) {
    let response;      
    try {
      response = await ServiceService.getsServiceDetailsTotalValorId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async delete(req, res) {
    let response;     
    try {
      response = await ServiceService.delete(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
}
export default new ServiceController();
