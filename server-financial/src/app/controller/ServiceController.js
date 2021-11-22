import ServiceService from '../../service/ServiceService'

class ServiceController {
  async storeService(req, res) {
    let response;     
    try {
      response = await ServiceService.storeService(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria um nono serviço!'});
    }
  }
  async getsServiceDetails(req, res) {
    let response;      
    try {
      response = await ServiceService.getsServiceDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca!'});
    }
  }
  async getsServiceDetailsId(req, res) {
    let response;      
    try {
      response = await ServiceService.getsServiceDetailsId(req.params);
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
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca!'});
    }
  }
  async deleteServiceId(req, res) {
    let response;     
    try {
      response = await ServiceService.deleteServiceId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir!'});
    }
  }
}
export default new ServiceController();
