import { body } from "express-validator";

export const createOrderValidator = [
  body("price").isFloat(),
  body("boxSize").isDecimal(),
  body("comment").optional().isLength({ min: 3 }),
  body("dateFrom", "Неверный формат даты").isString(),
  body("dateTo", "Неверный формат даты").isString(),
];
