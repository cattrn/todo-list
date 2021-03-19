const pgp = require('pg-promise')()
const { pguser, pgport, pgdatabase, pgpassword, pghost } = require('../config')

const connection = `postgres://${pguser}:${pgpassword}@${pghost}:${pgport}/${pgdatabase}`

const db = pgp(connection);

module.exports = db;