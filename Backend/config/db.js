import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    rejectUnauthorized: false
  }
});

// Check DB connection
(async () => {
  try {

    const conn = await connection.getConnection();

    console.log("Database Connected Successfully");

    conn.release();

  } catch (error) {

    console.log("Database Connection Failed");
    console.log(error);

  }
})();

export default connection;