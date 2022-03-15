import Product from "../app/models/Product";
import Service from "../app/models/Service";
import Order from "../app/models/Order";

export default {
  async index() {
    const products = await Product.findAll();
    const services = await Service.findAll();
    const order = await Order.findAll();

    const priceTotalProduct = products.map(function (res) {
      const valorTotal = res.dataValues.price * res.dataValues.quantity
      return valorTotal
    })
    const totalProduct = priceTotalProduct.reduce((acumulado, x) => {
      return acumulado + x;
    });

    const quantityProduct = products.map(function (res) {
      return parseInt(res.dataValues.quantity)
    })
    const totalQuantityProduct = quantityProduct.reduce((acumulado, x) => {
      return acumulado + x;
    });

    const valorService = services.map(function (result) {
      return parseInt(result.dataValues.price);
    })
    const totalService = valorService.reduce((acumulado, x) => {
      return acumulado + x;
    });

    const valorOrder = order.map(function (result) {
      return parseInt(result.dataValues.price_total);
    })
    const totalOrder = valorOrder.reduce((acumulado, x) => {
      return acumulado + x;
    });
    

    return { totalProduct, totalQuantityProduct, totalService, totalOrder }
  }
}