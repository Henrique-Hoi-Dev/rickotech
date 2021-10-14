import UserService from '../../service/UserService';

class UserController {
  async storeUser(req, res) {
    let response;     
    try {
      response = await UserService.storeUser(req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getUserDetails(req, res) {
    let response;      
    try {
      response = await UserService.getUserDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getUserDetailsId(req, res) {
    let response;      
    try {
      response = await UserService.getUserDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async updateUserId(req, res) {
    let response;
    try {
      response = await UserService.updateUserId(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async deleteUserId(req, res) {
    let response;     
    try {
      response = await UserService.deleteUserId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new UserController();
