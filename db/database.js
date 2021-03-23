const pgp = require('pg-promise')()
const { pguser, pgport, pgdatabase, pgpassword, pghost } = require('../config')

const connection = {
  connectionString: `postgres://${pguser}:${pgpassword}@${pghost}:${pgport}/${pgdatabase}`,
  ssl: { rejectUnauthorized: false }
}

const db = pgp(connection);

module.exports = db;