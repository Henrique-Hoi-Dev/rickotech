import UserService from '../../service/UserService';

class UserController {
  async store(req, res) {
    let response;     
    response = await UserService.store(req.body);
    return res.send(response);
  }
  async index(req, res) {
    let response;      
    response = await UserService.index();
    return res.send(response);
  }
  async getId(req, res) {
    let response;      
    response = await UserService.getId(req.params);
    return res.send(response);
  }
  async update(req, res) {
    let response;
    response = await UserService.update(req.body, req.params);
    return res.send(response);
  }
  async delete(req, res) {
    let response;     
    response = await UserService.delete(req.params);
    return res.send(response);
  }
}
export default new UserController();
