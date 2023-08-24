import { Router } from "express";
import Cart from "../dao/dbManager/carts.manager.js";
import Product from "../dao/dbManager/products.manager.js";


const router = Router();

const cartsManager = new Cart();

const productsManager = new Product();


router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.json({ message: "success", cart: carts });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los carritos",
      data: err,
    });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.getOne(cid);
    const data = cart.products;
    console.log({ idCart: cart._id });
    if (cart) {
      res.render("carts", { cart: data, idCart: cart._id });
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el carrito",
      data: err,
    });
  }
});


router.post("/", async (req, res) => {
  let newCart = {
    products: [],
  };
  try {
    const result = await cartsManager.saveCart(newCart);
    res.json({ message: "Carrito creado con éxito", data: newCart });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el carrito ", data: err });
  }
});


router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;


  try {
 

    const cart = await cartsManager.getOne(cid);
    cart.products.forEach((product) => console.log(product));
    let productExistsInCart = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCart == -1
      ? cart.products.push({
          product: pid,
          quantity: 1,
        })
      : (cart.products[productExistsInCart].quantity =
          cart.products[productExistsInCart].quantity + 1);

    const result = await cartsManager.updateCart(cid, cart);

    const updatedCart = await cartsManager.getOne(cid);
    console.log(updatedCart);

    res.json({ message: "Carrito actualizado con éxito", data: updatedCart });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el carrito",
      data: err,
    });
  }
});

export default router;
