const Sequelize = require('sequelize');
const databaseUrl =
  process.env.DATABASE_URL ||
  'postgres://postgres:secret@localhost:5432/postgres';

console.log('database_url:', process.env.DATABASE_URL);

const db = new Sequelize(databaseUrl);

module.exports = db;
