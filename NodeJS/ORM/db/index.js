const { drizzle } = require("drizzle-orm/node-postgres");
require("dotenv/config");

// postgres://<username>:<password>@<host>:<port>/<db_name>
const db = drizzle(process.env.DATABSE_URL);

module.exports = db;
