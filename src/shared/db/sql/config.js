module.exports = {
  "development": {
    "username": process.env.PSQL_USERNAME,
    "password": process.env.PSQL_PASSWORD,
    "database": process.env.PSQL_DB,
    "host": process.env.PSQL_HOST,
    "dialect": process.env.DIALECT,
  },
  "testing": {
    "username": process.env.PSQL_USERNAME,
    "password": process.env.PSQL_PASSWORD,
    "database": process.env.PSQL_DB,
    "host": process.env.PSQL_HOST,
    "dialect": process.env.DIALECT,
  },
  "production": {
    "username": process.env.PSQL_USERNAME,
    "password": process.env.PSQL_PASSWORD,
    "database": process.env.PSQL_DB,
    "host": process.env.PSQL_HOST,
    "dialect": process.env.DIALECT,
  }
}