import * as Yup from 'yup';
import File from "../app/models/File";
import Product from "../app/models/Product";
import httpStatus from 'http-status-codes';

export default {
async store(req, res) {
  try {
    let product = req;

    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      codigo_barra: Yup.string().required(),
    });

    if (!(await schema.isValid(product))) {
      return res.status(400).json({ message: 'Falha na validação' });
    }

    const products = await Product.create(product);

    return products;
  } catch (error) {
    return res.status(400).json(error.message);
  }
},
async index(req, res) {
    try {
      const products = await Product.findAll({
        attributes: [ 
          'id', 
          'name', 
          'valor', 
          'categoria',
          'data_registro', 
          'codigo_barra' 
        ],
        include: [
        {
          model: File,
          as: 'avatar',
          attributes: [ 'url', 'id', 'path' ]
        },
      ]  
    });

    return products;
  } catch (error) {
    return res.status(400).json(error)
  }
},
async getId(req, res) {
  try {
    let product = await Product.findByPk(req.id, {
      attributes: [ 
        'id', 
        'name', 
        'valor', 
        'categoria',
        'data_registro', 
        'codigo_barra' 
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: [ 'url', 'id', 'path' ]
        },
      ] 
    });
    return product;
  } catch (error) {
    return res.status(400).json(error)};
  },
  async update(req, res) {
    try {
      const product = await Product.findByPk(req.id);
      let productUpdated = await product.update(res);

      return productUpdated;
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async delete(req, res) {
    let result = {}
    try {
      const id  = req.id;

      const products = await Product.destroy({
        where: {
          id: id,
        },
      });

      if (!products) {
        return res.status(400).json({ message: 'product not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: products}      
      return result
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
