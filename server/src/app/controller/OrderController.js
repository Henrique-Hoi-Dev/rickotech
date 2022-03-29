import OrderService from '../../service/OrderService';

class OrderController {
  async store(req, res) {
    let response;     
    response = await OrderService.store(req.body, req.params);
    return res.send(response);
  }
  async index(req, res) {
    let response;      
    response = await OrderService.index(req.params);
    return res.send(response);
  }
  async getId(req, res) {
    let response;      
    response = await OrderService.getId(req.params);
    return res.send(response);
  }
  async delete(req, res) {
    try {
      let response;     
      response = await OrderService.delete(req.params);
      return res.status(200).send(response);
    } catch {
      return res.status(200).json([])
    } 
  }
}
export default new OrderController();
