const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "34.101.241.181",
  user: "elvanromp",
  password: "wwy982vr88",
  database: "rekomenin"
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Connected to MySQL database");
    connection.release(); 
  } catch (err) {
    console.error("Error connecting to MySQL database:", err);
  }
}

testConnection();

module.exports = db;