require("dotenv").config();
const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "hotel_management",
//   password: "p@stgress",
//   port: "5433",
// });


// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORTDB,
// });

// I try with env file. But if I use env then data is not fetch. I try but did not find out the problem.
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotel_management",
  password: "admin",
  port: "5432",
});

module.exports = pool;
