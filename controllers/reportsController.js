const path = require("path");
const Expense = require("../models/expenseModel");
const { Op } = require("sequelize");
const AwsService = require("../services/awsService");

// Global variables to store expense data and type for daily, weekly and monthly
let currentReportData = [];
let currentReportType = "";

exports.getReportsPage = (req, res, next) => {
  try {
    res.sendFile(
      path.join(__dirname, "../", "public", "views", "reports.html")
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.dailyReports = async (req, res, next) => {
  try {
    const date = req.body.date;
    const expenses = await Expense.findAll({
      where: { date: date, userId: req.user.id },
    });

    currentReportData = expenses;
    currentReportType = "Daily";

    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

function getWeekRange(weekString) {
  const [year, week] = weekString.split("-W");

  return {
    startDate: getDateOfISOWeek(year, week, 1),
    endDate: getDateOfISOWeek(year, week, 7),
  };
}

function getDateOfISOWeek(year, week, day) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const ISOWeekStart =
    simple.getDay() <= 4
      ? simple.setDate(simple.getDate() - simple.getDay() + day)
      : simple.setDate(simple.getDate() + 7 - simple.getDay() + day);
  return new Date(ISOWeekStart);
}

exports.weeklyReports = async (req, res, next) => {
  try {
    const week = req.body.week;
    weekObj = getWeekRange(week);
    const expenses = await Expense.findAll({
      where: {
        date: {
          [Op.gte]: weekObj.startDate,
          [Op.lte]: weekObj.endDate,
        },
        userId: req.user.id,
      }
      // raw: true,  htna pda kyunki download report me ek jaisa data ka structure chahiye daily, weekly aur monhly sbke liye
    });

    currentReportData = expenses;
    currentReportType = "Weekly";

    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.monthlyReports = async (req, res, next) => {
  try {
    const month = req.body.month;
    const expenses = await Expense.findAll({
      where: {
        date: {
          [Op.like]: `${month}-%`,
        },
        userId: req.user.id,
      },
    });

    currentReportData = expenses;
    currentReportType = "Monthly";

    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.downloadReport = async (req, res, next) => {
  try {
    const filename = `${currentReportType} Report/${
      req.user.name
    }_Expenses_${new Date().toISOString()}.csv`;

    // convert the expenses data to csv
    let csv = "";

    if (currentReportData.length > 0) {
      const excludedKeys = ["id", "createdAt", "updatedAt", "userId"];
      const headers = Object.keys(currentReportData[0].dataValues).filter(
        (key) => !excludedKeys.includes(key)
      );
      csv += headers.join(",") + "\n";

      currentReportData.forEach((row) => {
        const values = headers.map((header) => `"${row.dataValues[header]}"`);
        csv += values.join(",") + "\n";
      });
    }

    // reset the global variables - taaki jb tk dobara koi data fetch na kra jaaye tab tk inme koi value na aaye ek baar download krne ke baad
    if(currentReportData.length === 0) return res.status(200).json({downloadURL: "", message:"To download again, re-fetch the data.", success: false});
    currentReportData = [];
    currentReportType = "";

    const downloadURL = await AwsService.uploadToS3(csv, filename);
    res.status(200).json({downloadURL, success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
