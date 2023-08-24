import { Router } from "express";
import CartProduct from "../dao/dbManager/cartProduct.manager.js";

const router = Router();
const cartProductManager = new CartProduct();

router.post("/", async (req, res) => {
  const { id, quantity } = req.body;
  let newCartProduct = {
    id: id,
    quantity: quantity,
  };
  try {
    const cart = await cartProductManager.saveCartProduct(newCartProduct);
    res.json({ message: "Producto agregado con éxito", data: cart });
  } catch (err) {
    res.status(500).json({
      message: "Error al agregar el producto al carrito",
      data: err,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartProductManager.updateCartProduct(id, quantity);
    res.json({ message: "Producto actualizado con éxito", data: cart });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el producto del carrito",
      data: err,
    });
  }
});

export default router;
