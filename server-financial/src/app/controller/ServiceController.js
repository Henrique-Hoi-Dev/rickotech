import ServiceService from '../../service/ServiceService'

class ServiceController {
  async storeService(req, res) {
    let response;     
    try {
      response = await ServiceService.store(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria um nono serviço!'});
    }
  }
  async getsServiceDetails(req, res) {
    let response;      
    try {
      response = await ServiceService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca!'});
    }
  }
  async getsServiceDetailsId(req, res) {
    let response;      
    try {
      response = await ServiceService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca!'});
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
  async deleteServiceId(req, res) {
    let response;     
    try {
      response = await ServiceService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir!'});
    }
  }
}
export default new ServiceController();
