import cartsModel from "../models/carts.model.js";

export default class Cart {

  getAll = async () => {
    let result = await cartsModel.find().lean();
    return result;
  };

  getOne = async (id) => {
    let result = await cartsModel.findById(id).lean();
    return result;
  };

  saveCart = async (cart) => {
    let result = await cartsModel.create(cart);
    return result;
  };

  updateCart = async (id, cart) => {
    let result = await cartsModel.updateOne({ _id: id }, cart);
    return result;
  };
}
