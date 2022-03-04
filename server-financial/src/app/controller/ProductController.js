import ProductsService from '../../service/ProductService'

class ProductController {
  async store(req, res) {
    let response;     
    try {
      response = await ProductsService.store(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Error validated'});
    }
  }
  async index(req, res) {
    let response;      
    try {
      response = await ProductsService.index();
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async getId(req, res) {
    let response;      
    try {
      response = await ProductsService.getId(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async update(req, res) {
    let response;
    try {
      response = await ProductsService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
  async delete(req, res) {
    let response;     
    try {
      response = await ProductsService.delete(req.params);
      return res.status(200).send(response);
        
    } catch {
      return res.status(200).json([]);
    }
  }
}
export default new ProductController();
