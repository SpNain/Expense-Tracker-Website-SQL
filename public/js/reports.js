// Global variables to hold the last fetched report data and its type.
let currentReportData = [];
let currentReportType = "";

/* ---- DAILY REPORT CODE---- */

// Daily Report function
async function getDailyReport(e) {

  // Get inputs, table body and table footers for daily report
  const dateInput = document.getElementById("date");
  const tbodyDaily = document.getElementById("tbodyDailyId");
  const tfootDaily = document.getElementById("tfootDailyId");

  try {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const dateValue = dateInput.value;

    if (!dateValue) {
      alert("Please select a date.");
      return;
    }

    let totalAmount = 0;
    const response = await axios.post(
      "http://localhost:3000/reports/dailyReports",
      { date: dateValue },
      { headers: { Authorization: token } }
    );

    // Save the data and report type globally for CSV download
    currentReportData = response.data;
    currentReportType = "daily";

    tbodyDaily.innerHTML = "";
    tfootDaily.innerHTML = "";
    response.data.forEach((expense) => {
      totalAmount += expense.amount;
      const tr = document.createElement("tr");
      tr.classList.add("trStyle");
      tbodyDaily.appendChild(tr);
      const th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = expense.date;
      const td1 = document.createElement("td");
      td1.textContent = expense.category;
      const td2 = document.createElement("td");
      td2.textContent = expense.description;
      const td3 = document.createElement("td");
      td3.textContent = expense.amount;
      tr.append(th, td1, td2, td3);
    });
    const tr = document.createElement("tr");
    tr.classList.add("trStyle");
    tfootDaily.appendChild(tr);
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td3.setAttribute("id", "dailyTotal");
    td4.setAttribute("id", "dailyTotalAmount");
    td3.textContent = "Total";
    td4.textContent = totalAmount;
    tr.append(td1, td2, td3, td4);
  } catch (err) {
    console.error(err);
  }
}

// Add event listener for showing daily report
document.getElementById("dailyForm").addEventListener("submit", getDailyReport);

// Function to load Dynamic Daily Report Form
function loadDailyReportForm() {
  const container = document.getElementById("reportsContainer");
  container.innerHTML = `
      <!-- Daily Table -->
  
          <div class="container table-responsive mt-4 p-3 d-flex bd-highlight reportTable">
              <!-- Daily table Form -->
  
              <div class="ps-2 pe-5 py-1 ms-3 me-5 my-1 bd-highlight">
                  <div class="my-1">
                      <h3>DAILY REPORTS</h3>
                  </div>
                  <div>
                      <form id="dailyForm">
                          <div class="mb-3">
                              <label for="date" class="form-label"> Select Date</label>
                              <input type="date" class="form-control" id="date" />
                          </div>
                          <button id="dateShowBtn" type="submit" class="btn btn-primary showBtn">Show</button>
                      </form>
                  </div>
              </div>
  
              <div id="dailyTable" class="p-2 flex-grow-1 bd-highlight">
                  <table class="table table-hover display" style="width: 100%">
                      <!-- Daily table head -->
  
                      <thead>
                          <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Category</th>
                              <th scope="col">Description</th>
                              <th scope="col">Amount</th>
                          </tr>
                      </thead>
  
                      <!-- Daily table body -->
  
                      <tbody id="tbodyDailyId">
                        
                      </tbody>
                      <tfoot id="tfootDailyId">
  
                      </tfoot>
                  </table>
              </div>
          </div>
  
      </div>
    `;
  // Attach event listener for the daily form submission
  document
    .getElementById("dailyForm")
    .addEventListener("submit", getDailyReport);
}

// Change buttons CSS
document.getElementById("btnDaily").addEventListener("click", function () {
  // Update button styles if needed
  document
    .getElementById("btnDaily")
    .classList.replace("btn-secondary", "btn-primary");
  document
    .getElementById("btnWeekly")
    .classList.replace("btn-primary", "btn-secondary");
  document
    .getElementById("btnMonthly")
    .classList.replace("btn-primary", "btn-secondary");
  loadDailyReportForm();
});

/* ---- WEEKLY REPORT CODE---- */

// Weekly Report function
async function getWeeklyReport(e) {
  // Get inputs, table body and table footers for weekly report
  const weekInput = document.getElementById("week");
  const tbodyWeekly = document.getElementById("tbodyWeeklyId");
  const tfootWeekly = document.getElementById("tfootWeeklyId");

  try {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const weekValue = weekInput.value;

    if (!weekValue) {
      alert("Please select a week.");
      return;
    }

    let totalAmount = 0;
    const response = await axios.post(
      "http://localhost:3000/reports/weeklyReports",
      { week: weekValue },
      { headers: { Authorization: token } }
    );

    // Save the data and report type globally for CSV download
    currentReportData = response.data;
    currentReportType = "weekly";

    tbodyWeekly.innerHTML = "";
    tfootWeekly.innerHTML = "";
    response.data.forEach((expense) => {
      totalAmount += expense.amount;
      const tr = document.createElement("tr");
      tr.classList.add("trStyle");
      tbodyWeekly.appendChild(tr);
      const th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = expense.date;
      const td1 = document.createElement("td");
      td1.textContent = expense.category;
      const td2 = document.createElement("td");
      td2.textContent = expense.description;
      const td3 = document.createElement("td");
      td3.textContent = expense.amount;
      tr.append(th, td1, td2, td3);
    });
    const tr = document.createElement("tr");
    tr.classList.add("trStyle");
    tfootWeekly.appendChild(tr);
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td3.setAttribute("id", "weeklyTotal");
    td4.setAttribute("id", "weeklyTotalAmount");
    td3.textContent = "Total";
    td4.textContent = totalAmount;
    tr.append(td1, td2, td3, td4);
  } catch (err) {
    console.error(err);
  }
}

// Function to load Dynamic Weekly Report Form
function loadWeeklyReportForm() {
  const container = document.getElementById("reportsContainer");
  container.innerHTML = `
    <!-- Weekly Table -->

    <div class="container table-responsive mt-4 mb-3 p-3 d-flex bd-highlight reportTable">
        <!-- Weekly table Form -->

        <div class="ps-2 pe-4 py-1 ms-3 me-5 my-1 bd-highlight">
            <div class="my-1">
                <h3>WEEKLY REPORTS</h3>
            </div>
            <div>
                <form id="weeklyForm">
                    <div class="mb-3">
                        <label for="week" class="form-label">Select Week</label>
                        <input type="week" class="form-control" id="week" />
                    </div>
                    <button id="weekShowBtn" type="submit" class="btn btn-primary showBtn">Show</button>
                </form>
            </div>
        </div>

        <div id="weeklyTable" class="p-2 flex-grow-1 bd-highlight">
            <table class="table table-hover" style="width: 100%">
                <!-- Weekly table head -->

                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>

                <!-- Weekly table body -->

                <tbody id="tbodyWeeklyId">
                    
                </tbody>
                <tfoot id="tfootWeeklyId">
                    
                </tfoot>
            </table>
        </div>
    </div>
  `;
  // Attach event listener for the weekly form submission
  document
    .getElementById("weeklyForm")
    .addEventListener("submit", getWeeklyReport);
}

// Change buttons CSS
document.getElementById("btnWeekly").addEventListener("click", function () {
  document
    .getElementById("btnWeekly")
    .classList.replace("btn-secondary", "btn-primary");
  document
    .getElementById("btnDaily")
    .classList.replace("btn-primary", "btn-secondary");
  document
    .getElementById("btnMonthly")
    .classList.replace("btn-primary", "btn-secondary");
  loadWeeklyReportForm();
});

/* ---- MONTHLY REPORT CODE---- */

// Monthly Report function
async function getMonthlyReport(e) {
  // Get inputs, table body and table footers for monthly report
  const monthInput = document.getElementById("month");
  const tbodyMonthly = document.getElementById("tbodyMonthlyId");
  const tfootMonthly = document.getElementById("tfootMonthlyId");

  try {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const monthValue = monthInput.value;

    if (!monthValue) {
      alert("Please select a month.");
      return;
    }

    let totalAmount = 0;
    const response = await axios.post(
      "http://localhost:3000/reports/monthlyReports",
      { month: monthValue },
      { headers: { Authorization: token } }
    );

    // Save the data and report type globally for CSV download
    currentReportData = response.data;
    currentReportType = "monthly";

    tbodyMonthly.innerHTML = "";
    tfootMonthly.innerHTML = "";
    response.data.forEach((expense) => {
      totalAmount += expense.amount;
      const tr = document.createElement("tr");
      tr.classList.add("trStyle");
      tbodyMonthly.appendChild(tr);
      const th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = expense.date;
      const td1 = document.createElement("td");
      td1.textContent = expense.category;
      const td2 = document.createElement("td");
      td2.textContent = expense.description;
      const td3 = document.createElement("td");
      td3.textContent = expense.amount;
      tr.append(th, td1, td2, td3);
    });
    const tr = document.createElement("tr");
    tr.classList.add("trStyle");
    tfootMonthly.appendChild(tr);
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td3.setAttribute("id", "monthlyTotal");
    td4.setAttribute("id", "monthlyTotalAmount");
    td3.textContent = "Total";
    td4.textContent = totalAmount;
    tr.append(td1, td2, td3, td4);
  } catch (err) {
    console.error(err);
  }
}

// Function to load Dynamic Monthly Report Form
function loadMonthlyReportForm() {
  const container = document.getElementById("reportsContainer");
  container.innerHTML = `
    <!-- Monthly Table -->

    <div class="container table-responsive mt-4 p-3 d-flex bd-highlight reportTable">
        <!-- Monthly table Form -->

        <div class="px-2 py-1 ms-3 me-4 my-1 bd-highlight">
            <div class="my-1">
                <h3>MONTHLY REPORTS</h3>
            </div>
            <div>
                <form id="monthlyForm">
                    <div class="mb-3">
                        <label for="month" class="form-label">Select Month</label>
                        <input type="month" class="form-control" id="month" />
                    </div>
                    <button id="monthShowBtn" type="submit" class="btn btn-primary showBtn">Show</button>
                </form>
            </div>
        </div>

        <div id="monthlyTable" class="p-2 flex-grow-1 bd-highlight">
            <table class="table table-hover display" style="width: 100%">
                <!-- Monthly table head -->

                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>

                <!-- Monthly table body -->

                <tbody id="tbodyMonthlyId">
                    
                </tbody>
                <tfoot id="tfootMonthlyId">
                    
                </tfoot>
            </table>
        </div>
    </div>
  `;
  // Attach event listener for the monthly form submission
  document
    .getElementById("monthlyForm")
    .addEventListener("submit", getMonthlyReport);
}

// Change buttons CSS
document.getElementById("btnMonthly").addEventListener("click", function () {
  document
    .getElementById("btnMonthly")
    .classList.replace("btn-secondary", "btn-primary");
  document
    .getElementById("btnDaily")
    .classList.replace("btn-primary", "btn-secondary");
  document
    .getElementById("btnWeekly")
    .classList.replace("btn-primary", "btn-secondary");
  loadMonthlyReportForm();
});


/* --------- Download Report Functionality --------- */

// Helper: Trigger a download of a CSV file
function downloadCSV(csvContent, filename) {
  const csvFile = new Blob([csvContent], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Helper: Convert JSON data to CSV format and trigger download
function exportDataToCSV(data, filename) {
  // Convert JSON data to CSV format
  let csv = "";
  if (data.length > 0) {

    // The keys to exclude in csv file
    const excludedKeys = ["id", "createdAt", "updatedAt", "userId"];
    // Filter the headers to remove the unwanted keys
    const headers = Object.keys(data[0]).filter(
      (key) => !excludedKeys.includes(key)
    );

    csv += headers.join(",") + "\n";

    // Append rows using only the filtered headers
    data.forEach((row) => {
      const values = headers.map((header) => `"${row[header]}"`);
      csv += values.join(",") + "\n";
    });
  }
  downloadCSV(csv, filename);
}

// Attach download functionality to the download button
const downloadBtn = document.querySelector(".btn-download");
downloadBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!currentReportData || currentReportData.length === 0) {
    alert("No report data available for download. Please fetch a report first.");
    return;
  }
  const filename = `${currentReportType}_report.csv`;
  exportDataToCSV(currentReportData, filename);
});