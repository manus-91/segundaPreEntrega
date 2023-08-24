import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.router.js";
import { Server } from "socket.io";
import cartProductRouter from "./routes/cartProduct.router.js";
import Messages from "./dao/dbManager/messages.manager.js";
import * as dotenv from "dotenv";


dotenv.config();


const messagesManager = new Messages();
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando peticiones desde el puerto ${PORT}`);
});
const MONGO_URI = process.env.MONGO_URI;


const connection = mongoose.connect(MONGO_URI);

connection
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err);
  });


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const io = new Server(httpServer);


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/chat/", chatRouter);
app.use("/api/cart/", cartProductRouter);


io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.id = data.id;
    io.emit("new-user-connected", {
      user: socket.user,
      id: socket.id,
    });
  });
  socket.on("message", async (data) => {
    try {
      await messagesManager.saveMessage(data);
      let messages = await messagesManager.getAll();
      io.emit("messageLogs", messages);
    } catch (err) {
      console.log(err);
    }
  });
});
