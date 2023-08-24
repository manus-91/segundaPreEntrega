import mongoose from "mongoose";

const cartProductCollection = "cartProduct";

const cartProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartProductModel = mongoose.model(
  cartProductCollection,
  cartProductSchema
);

export default cartProductModel;
