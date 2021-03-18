const pgp = require('pg-promise')();
const { pgport, pguser, pgdatabase, pgpassword, pghost } = require('../config');

let connection = `postgres://${pguser}:${pgpassword}@${pghost}:${pgport}/${pgdatabase}`

const db = pgp(connection);

module.exports = db;