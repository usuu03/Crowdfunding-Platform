const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "crowdfunding.c9am8nnvogkn.us-east-1.rds.amazonaws.com", // Your database host
  user: "admin", // Your database username
  password: "database2023", // Your database password
  database: "crowdfunding", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
