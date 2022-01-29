import UserService from '../../service/UserService';

class UserController {
  async storeUser(req, res) {
    let response;     
    try {
      response = await UserService.store(req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getUserDetails(req, res) {
    let response;      
    try {
      response = await UserService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getUserDetailsId(req, res) {
    let response;      
    try {
      response = await UserService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async updateUserId(req, res) {
    let response;
    try {
      response = await UserService.update(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async deleteUserId(req, res) {
    let response;     
    try {
      response = await UserService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: "Erro no excluir"});
    }
  }
}
export default new UserController();
