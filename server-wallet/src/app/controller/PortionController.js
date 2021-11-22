import * as Yup from 'yup';
import Portion from '../models/Portion';
import Account from '../models/Account';
import PortionService from '../../service/PortionService'

class PortionController {
  // create uma nova parcela
  async storePortion(req, res) {
    let response;     
    try {
      response = await PortionService.storePortion(req.params, req.body);
      console.log(response)
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria uma nova parcela'});
    }
  }
  // busca conta por Id com todas as parcelas, com soma de todos os valores 
  async getPortionDetailsWithValouTotal(req, res) {
    let response;      
    try {
      response = await PortionService.getPortionDetailsWithValouTotal(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // busca uma parcela por Id
  async getPortionDetailsId(req, res) {
    let response;      
    try {
      response = await PortionService.getPortionDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca'});
    }
  }
  // atualiza parcela por Id
  async updatePortionId(req, res) {
    let response;      
    try {
      response = await PortionService.updatePortionId(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no atualizar'});
    }
  }
  // excluir uma parcela por Id
  async deletePortionId(req, res) {
    let response;      
    try {
      response = await PortionService.deletePortionId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir'});
    }
  }
}

export default new PortionController();
