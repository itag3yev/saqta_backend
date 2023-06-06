import OrderModel from "../models/Order.js";

export const create = async (req, res) => {
  try {
    const doc = new OrderModel({
      price: req.body.price,
      boxSize: req.body.boxSize,
      comment: req.body.comment,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      user: req.userId,
    });

    const order = await doc.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалость создать заказ" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.userId });

    if (!orders) {
      return res.status(500).json({ message: "Не удалось получить заказы" });
    }

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить заказы" });
  }
};
