import productsModel from "../models/products.model.js";

export default class Product {

  getAll = async () => {
    let products = await productsModel.find().lean();
    return products;
  };

  getOne = async (id) => {
    let product = await productsModel.findById(id);
    return product;
  };

  saveProducts = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };

  updateProducts = async (id, product) => {
    let result = await productsModel.findByIdAndUpdate(id, product);
    return result;
  };

  deleteProducts = async (id) => {
    let product = await productsModel.findByIdAndDelete(id);
    return product;
  };
}
