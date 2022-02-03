import AdressService from "../../service/AdressService";

class AdressController {
  async storeAdress(req, res) {
    let response;     
    try {
      response = await AdressService.store(req.body, req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getAdressDetailsId(req, res) {
    let response;      
    try {
      response = await AdressService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async updateAdressId(req, res) {
    let response;
    try {
      response = await AdressService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async deleteAdress(req, res) {
    let response;     
    try {
      response = await AdressService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new AdressController();