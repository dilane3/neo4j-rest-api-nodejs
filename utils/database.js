require("dotenv").config()

const neo4j = require('neo4j-driver')

const {
  DATABASE_URI,
  USERNAME_DB,
  PASSWORD_DB
} = process.env

const startDriver = () => {
  const driver = neo4j.driver(DATABASE_URI, neo4j.auth.basic(USERNAME_DB, PASSWORD_DB))

  return driver.session()
}

module.exports = {session: startDriver()}