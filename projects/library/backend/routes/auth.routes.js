import express from "express";
import controller from "../controller/authController.js";
const route = express();

route.get("/", (req, res) => {
  res.status(201).json({ message: `Request received` });
});

route.post("/login", controller.login);
route.post("/signup", controller.signup);
route.post("/logout", controller.logout);

export default route;
