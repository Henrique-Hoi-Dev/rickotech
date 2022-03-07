import ProductsService from '../../service/ProductService'

class ProductController {
  async store(req, res) {
    let response;     
    response = await ProductsService.store(req.body);
    return res.send(response);
  }
  async index(req, res) {
    let response;      
    response = await ProductsService.index();
    return res.send(response);
  }
  async getId(req, res) {
    let response;      
    response = await ProductsService.getId(req.params);
    return res.send(response);
  }
  async update(req, res) {
    let response;
    response = await ProductsService.update(req.params, req.body);
    return res.send(response);
  }
  async delete(req, res) {
    let response;     
    response = await ProductsService.delete(req.params);
    return res.send(response);
  }
}
export default new ProductController();
