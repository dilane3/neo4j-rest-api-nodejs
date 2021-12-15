require("dotenv").config()

const neo4j = require('neo4j-driver')

const {
  DATABASE_URI,
  USERNAME_DB,
  PASSWORD_DB,
  DATABASE_NAME
} = process.env

const startDriver = () => {
  const driver = neo4j.driver(DATABASE_URI, neo4j.auth.basic(USERNAME_DB, PASSWORD_DB))

  return driver.session({database: DATABASE_NAME})
}

module.exports = {dbConnect: startDriver}