import OrderService from '../../service/OrderService';

class OrderController {
  async store(req, res) {
    let response;     
    try {
      response = await OrderService.store(req.body, req.params);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async index(req, res) {
    let response;      
    try {
      response = await OrderService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(200).json([]);
    }
  }
  async getId(req, res) {
    let response;      
    try {
      response = await OrderService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getsSalesDetailsTotalValorId(req, res) {
    let response;      
    try {
      response = await OrderService.getsSalesDetailsTotalValorId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async delete(req, res) {
    let response;     
    try {
      response = await OrderService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new OrderController();
