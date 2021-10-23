import * as Yup from 'yup';
import File from "../app/models/File";
import Product from "../app/models/Product";
import Sales from "../app/models/Sales";
import httpStatus from 'http-status-codes';

export default {
// create um novo produto, validando se á um produto com o mesmo nome ou codigo de barra
async storeProduct(req, res) {
  let product = req;
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      codigo_barra: Yup.string().required(),
    });

    if (!(await schema.isValid(product))) {
      return res.status(400).json({ message: 'Falha na validação' });
    }

    // const ProductExist = await Product.findOne({
    //   where: { name: product.name },
    // });

    // if (ProductExist) {
    //   return res.status(400).json({ message: 'Esse Produto já existe.' });
    // }
    const products = await Product.create(product);

    return products;
  } catch (error) {
    return res.status(400).json(error.message);
  }
},
// busca todos os produtos, incluindo a informação se ele já possui uma venda
// e informação do avatar do produto
async getProductDetails(req, res) {
    try {
      const product = await Product.findAll({
        attributes: [ 'id', 'status', 'name', 'valor', 'categoria','data_registro', 
                      'altura', 'largura', 'comprimento', 'peso',
                      'codigo_barra', 'descricao' ],
        include: [
        {
          model: File,
          as: 'avatar',
          attributes: [ 'url', 'id' ]
        },
        {
          model: Sales,
          as: 'sales',  
          attributes: [ 'name', 'valor', 'desconto', 'tipo_pagamento', 
                        'tipo_parcela', 'parcela_valor', 'parcela_numero' ]
        }
      ]  
    });
    return product;
  } catch (error) {
  return res.status(400).json(error)
  }
},
// busca um produto por Id, incluindo informações do avatar e se á uma venda
async getProductDetailsId(req, res) {
  try {
    let product = await Product.findByPk(req.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: [ 'url', 'id' ]
        },
        {
          model: Sales,
          as: 'sales',  
          attributes: [ 'name', 'valor', 'desconto', 'tipo_pagamento', 
                        'tipo_parcela', 'parcela_valor', 'parcela_numero' ]
        }
      ] 
    });
    return product;
  } catch (error) {
    return res.status(400).json(error)};
  },
  // atualiza um produto
  async updateProductId(req, res) {
    try {
      let products = res

      const product = await Product.findByPk(req.id);
      let productUpdated = await product.update(products);

      return productUpdated;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // exclui um produto por Id
  async deleteProductId(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const products = await Product.destroy({
        where: {
          id: id,
        },
      });

      if (!products) {
        return res.status(400).json({ message: 'adress not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: products}      
      return result
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
