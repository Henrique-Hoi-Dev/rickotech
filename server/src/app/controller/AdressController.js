import AdressService from "../../service/AdressService";

class AdressController {
  async store(req, res) {
    let response;     
    response = await AdressService.store(req.body, req.params);
    return res.send(response);
  }
  async getId(req, res) {
    let response;      
    response = await AdressService.getId(req.params);
    return res.send(response);
  }
  async update(req, res) {
    let response;
    response = await AdressService.update(req.params, req.body);
    return res.send(response);
  }
  async delete(req, res) {
    let response;     
    response = await AdressService.delete(req.params);
    return res.send(response);
  }
}
export default new AdressController();