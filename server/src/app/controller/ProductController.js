import * as Yup from 'yup';
import File from '../models/File';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      codigo_de_barra: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body.values))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const ProductExist = await Product.findOne({
      where: { name: req.body.values.name },
    });

    if (ProductExist) {
      return res.status(400).json({ error: 'Esse Produto já existe.' });
    }
    const product = await Product.create(req.body.values);

    return res.json(product);
  }

  async getAll(req, res) {
    const product = await Product.findAll({
      include: {
        model: File,
        as: 'avatar',
      },
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
        include: {
          model: File,
          as: 'avatar',
        },
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
