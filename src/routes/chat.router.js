import { Router } from "express";
import Messages from "../dao/dbManager/messages.manager.js";

const router = Router();
const messagesManager = new Messages();


router.get("/", async (req, res) => {
  try {
    const response = await messagesManager.getAll();
    console.log(response);
    res.render("chat", {
      styles: "chatView.css",
      title: "Chat",
      data: response,
    });
  } catch (err) {
    res.status(500).render({ message: "Error al iniciar el chat", data: err });
  }
});

export default router;
