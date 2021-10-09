import * as Yup from 'yup';
import File from '../models/File';
import Product from '../models/Product';
import Sales from '../models/Sales';

class ProductController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required().max(100),
        codigo_barra: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação' });
      }

      const ProductExist = await Product.findOne({
        where: { name: req.body.name },
      });

      if (ProductExist) {
        return res.status(400).json({ error: 'Esse Produto já existe.' });
      }

      const { 
        name,
        status,
        valor,
        categoria,
        dia_semana,
        horario,
        altura,
        comprimento,
        previous,
        codigo_barra,
        descricao
       } = await Product.create(req.body);

      return res.json({
        name,
        status,
        valor,
        categoria,
        dia_semana,
        horario,
        altura,
        comprimento,
        previous,
        codigo_barra,
        descricao
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
    
  async getAll(req, res) {
    const product = await Product.findAll({
      include: [
      {
        model: File,
        as: 'avatar',
        attributes: [ 'url', 'id' ]
      },
      {
        model: Sales,
        as: 'sales',  
        attributes: [ 
          'name', 
          'valor',
          'desconto', 
          'tipo_pagamento',
          'tipo_parcela',
          'parcela_valor',
          'parcela_numero'
        ]
      }
    ]  
    });
    return res.status(200).json(product);
  }
  catch(error) {
    return res.status(400).json(error);
  }

  async getById(req, res) {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: [ 'url', 'id' ]
          },
          {
            model: Sales,
            as: 'sales',  
            attributes: [ 
              'name', 
              'valor',
              'desconto', 
              'tipo_pagamento',
              'tipo_parcela',
              'parcela_valor',
              'parcela_numero'
            ]
          }
        ] 
      });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.destroy({
        where: {
          id: id,
        },
      });

      if (!product) {
        return res.status(400).json({ message: 'product not found' });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    let productUpdated = await product.update(req.body);

    console.log('Updated com sucesso');
    return res.json(productUpdated);
  }
}
export default new ProductController();
