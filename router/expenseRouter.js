const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.get("/", expenseController.getHomePage);
router.get("/getAllExpenses", expenseController.getAllExpenses);
router.post("/addExpense", expenseController.addExpense);

router.get("/deleteExpense/:id", expenseController.deleteExpense);
router.post("/editExpense/:id", expenseController.editExpense);

module.exports = router;
