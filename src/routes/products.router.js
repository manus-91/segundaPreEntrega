import { Router } from "express";
import Product from "../dao/dbManager/products.manager.js";

const router = Router();
const productsManager = new Product();


router.get("/all", async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.json({ message: "success", products: products });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los productos",
      data: err,
    });
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const response = await productsManager.getAll();
    if (limit) {
      let tempArray = response.slice(0, limit);
      res.render("products", { products: tempArray });
    } else {
      res.render("products", { products: response });
    }
  } catch (err) {
    res.render({ message: "Error al obtener los productos", data: err });
  }
});


router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsManager.getOne(pid);
    if (product) {
      res.json({ message: "success", products: product });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el producto",
      data: err,
    });
  }
});


router.post("/", async (req, res) => {
  let codeExist;
  try {
    let products = await productsManager.getAll();
    codeExist = products.find((product) => product.code === code);
  } catch (err) {
    console.log(err);
  }

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  if (!title || !description || !price || !code || !stock) {
    res.status(400).json({ message: "Faltan datos" });
  }

  if (codeExist) {
    res.status(400).json({ message: "El código ya existe" });
  } else {
    let product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: !thumbnails ? "" : thumbnails,
    };
    try {
      await productsManager.saveProducts(product);
      res.json({ message: "Producto creado con éxito", data: product });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al crear el producto", data: err });
    }
  }
});


router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  try {
    if (Object.keys(data).length === 0) {
      res.status(400).json({ message: "Faltan datos" });
    } else {
      await productsManager.updateProducts(pid, data);
      res.json({
        message: "Producto modificado con éxito",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al modificar el producto",
      data: err,
    });
  }
});


router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const respuesta = await productsManager.deleteProducts(pid);
    if (respuesta) {
      res.json({
        mensaje: "Producto eliminado con éxito",
        producto: respuesta,
      });
    } else {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el producto", err: err });
  }
});

export default router;
