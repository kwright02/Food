// Connect to MySQL
const config = require("user.json");
const mysql = require("mysql");
const database = "salesbot";
var sql = "";
var connection = mysql.createConnection({
  host: config.ip,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database
});

// Connect to MySQL
connection.connect(function(error) {
//   If error, log it
  if(error) {
    if(error.code !== "ER_ACCESS_DENIED_ERROR") {
      console.error("Unhandled error: " + error.message);
      return
    }
    console.error("Error: Failed to connect to database");
    return;
  }
  console.log("Connected to MySQL");
  console.log("Database: salesbot");
});
