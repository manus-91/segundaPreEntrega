import cartProductModel from "../models/cartProduct.model.js";

export default class CartProduct {
  saveCartProduct = async (cartProduct) => {
    const result = await cartProductModel.create(cartProduct);
    return result;
  };

  updateCartProduct = async (id, product) => {
    console.log(id, product);
    const result = await cartProductModel.updateOne(id, product);
    return result;
  };
}
