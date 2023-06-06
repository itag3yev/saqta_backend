import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { registerValidator, loginValidator, createOrderValidator } from "./validations/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { OrderController, UserController } from "./controllers/index.js";

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.8cobjed.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidator, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidator, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/order", checkAuth, createOrderValidator, handleValidationErrors, OrderController.create);
app.get("/order", checkAuth, OrderController.getOrdersByUser);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
