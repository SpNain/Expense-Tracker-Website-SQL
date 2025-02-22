const path = require("path");
const User = require("../models/userModel");
const sequelize = require("../util/database");

exports.getLeaderboardPage = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "public", "views", "leaderboard.html")
  );
};

/*
OPTIMIZED
exports.getLeaderboard = (req, res, next) => {
  Expense.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("amount")), "totalExpense"],
      [sequelize.col("user.name"), "name"],
    ],
    group: ["userId"],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
    order: [[sequelize.fn("sum", sequelize.col("amount")), "DESC"]],
  })
    .then((expenses) => {
      const result = expenses.map((expense) => ({
        name: expense.getDataValue("name"),
        amount: expense.getDataValue("totalExpense"),
      }));
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};
*/

// MORE OPTIMIZED
exports.getAllUsersForLeaderboard = (req, res, next) => {
  User.findAll({
    attributes: [
      [sequelize.col("name"), "name"],
      [sequelize.col("totalExpenses"), "totalExpenses"],
    ],
    order: [[sequelize.col("totalExpenses"), "DESC"]],
  })
    .then((users) => {
      const result = users.map((user) => ({
        name: user.getDataValue("name"),
        totalExpenses: user.getDataValue("totalExpenses"),
      }));
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.error('Error fetching users for leaderboard:', err);
      res.status(500).send('An error occurred while retrieving the leaderboard.');
    });
};
