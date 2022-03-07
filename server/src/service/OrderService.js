import Product from "../app/models/Product";
import Order from "../app/models/Order";
import httpStatus from 'http-status-codes';
import FinancialBox from "../app/models/FinancialBox";

export default  {
  async store(req, res) {
    let result = {}
    let { 
      financial_id, 
      name_product, 
      price_product, 
      discount,
      product_quantity, 
      status 
    } = req;

    let product_id = res.product_id

    const financialBox = await FinancialBox.findOne({ where: { id: financial_id }});
    if (!financialBox) {
      result = {httpStatus: httpStatus.NOT_FOUND, status: "Financial not found", responseData: []}    
      return result
    }

    const existProduct = await Product.findOne({ where: { id: product_id}})
    if (existProduct.dataValues.quantity <= [0]) {
      result = {httpStatus: httpStatus.NOT_FOUND, status: "Product not exist", responseData: []}    
      return result
    }
    const financialBoxUser = await FinancialBox.findAll({ where: { id: financial_id }});

    const userId = financialBoxUser.map((result) => {
      return result.dataValues.user_id
    })
    const seller_id = userId

    const priceProduct = (price_product * product_quantity)

    if (discount >= 0) {

      const porcent = (priceProduct / 100) 
      const descont = (porcent * discount)
      const price_total = priceProduct - descont 
      const price_product = priceProduct
      
      const saleses = await Order.create({
        financial_id,
        product_id, 
        seller_id,
        name_product, 
        price_product,
        discount,
        product_quantity, 
        status,
        price_total, 
      }); 

      const productQuantity = await Product.findOne({ where: { id: product_id }})
      const proQuantity = productQuantity.dataValues.quantity - product_quantity

      const quantity = proQuantity

      await productQuantity.update({quantity})

      return saleses
      

      // if (status === "closed" || "sold") { 
      //   const salesProduct = await Product.findByPk(req.product_id)
      //   const salesUp = await Order.create({ sales_id: req.sales_id })

      //   return salesUp
      // }
    }
  },
  async index(req, res) {
    let result = {}

    let sales = await Order.findAll({
        attributes: [ 
          'id', 
          'product_id',
          'name_product', 
          'price_product', 
          'discount',
          'product_quantity', 
          'price_total',
          'status' 
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [ 'id', 'name', 'category', 'price' ],
          },
          {
            model: FinancialBox,
            as: 'financial',
            attributes: [ 
              'id', 
              'value_total_sales', 
              'value_total_service', 
              'value_total', 
              'open_caixa', 
              'close_caixa'],
          }
        ],
    });

    result = {httpStatus: httpStatus.OK, status: "Success", responseData: sales}    
    return result
  },
  async getId(req, res) {
    let result = {}
    let id = req.id

    let salesId = await Order.findByPk(id, {
      attributes: [ 
        'id', 
        'product_id',
        'name_product', 
        'price_product', 
        'discount',
        'product_quantity', 
        'price_total',
        'status'  
      ],
      include: [
        {
          model: Product,
          as: 'products',
          attributes: [ 'id', 'name', 'category', 'price' ],
        },
        {
          model: FinancialBox,
          as: 'financial',
          attributes: [ 
            'id', 
            'value_total_sales', 
            'value_total_service', 
            'value_total', 
            'open_caixa', 
            'close_caixa'
          ],
        }
      ],
    });

    result = {httpStatus: httpStatus.OK, status: "Success", responseData: salesId}    
    return result
  },
  async delete(req, res) {
    let result = {}
    const id  = req.id;

    const saleses = await Order.destroy({
      where: {
        id: id,
      },
    });

    if (!saleses) {
      return res.status(400).json({ message: 'adress not found' });
    }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: saleses}      
    return result
  }
}
