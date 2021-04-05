const mysql = require("mysql");
const { database } = require("./keys");
const { promisify } = require("util");
pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
      return;
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
      return;
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
      return;
    }
    if (err) {
      console.log(err);
      return;
    }
  }

  if (connection) connection.release;
  console.log("Database is connected");
  return;
});
pool.query = promisify(pool.query);

module.exports = pool;
