import UserService from '../../service/UserService';

class UserController {
  async store(req, res) {
    let response;     
    try {
      response = await UserService.store(req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({ error: 'Error creating user!'});
    }
  }
  async index(req, res) {
    let response;      
    try {
      response = await UserService.index();
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async getId(req, res) {
    let response;      
    try {
      response = await UserService.getId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async update(req, res) {
    let response;
    try {
      response = await UserService.update(req.body, req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async delete(req, res) {
    let response;     
    try {
      response = await UserService.delete(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
}
export default new UserController();
