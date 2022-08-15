const sql = require("mysql");

let pool = sql.createPool({
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "library",
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_DB_PORT || 3306,
});

exports.pool = pool;
