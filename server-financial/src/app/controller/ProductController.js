import ProductsService from '../../service/ProductService'

class ProductController {
  async storeProduct(req, res) {
    let response;     
    try {
      response = await ProductsService.store(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getProductDetails(req, res) {
    let response;      
    try {
      response = await ProductsService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getProductDetailsId(req, res) {
    let response;      
    try {
      response = await ProductsService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async updateProductId(req, res) {
    let response;
    try {
      response = await ProductsService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async deleteProductId(req, res) {
    let response;     
    try {
      response = await ProductsService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new ProductController();
