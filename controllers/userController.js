const { query } = require("express")
const { nanoid } = require("nanoid")
const {session} = require("../utils/database.js")

class UserController {
  static getAllUsers = async (req, res) => {
    try {
      console.log("hello")
      const query = "MATCH (users:User) RETURN users"
      const users = await session.run(query)

      const usersData = users.records.map(user => {
        return user.get(0)?.properties
      })

      res.status(200).json(usersData)
    } catch(err) {
      res.sendStatus(500)
    } finally {
      await session.close()
    }
  }

  static getUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      try {
        const query = "MATCH (user:User{id: $id}) RETURN user"
        const user = await session.run(query, {id})

        const userData = user.records[0].get(0).properties

        res.status(200).json(userData)
      } catch (err) {
        console.error(err)
      } finally {
        await session.close()
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static createUser = async (req, res) => {
    const {name, email} = req.body

    if (name && email) {
      try {
        query = "CREATE (user:User{id: $id, name: $name, email: $email}) RETURN user"
        const user = await session.run(query, {id: nanoid(), name, email})

        const userData = user.records[0].get(0).properties

        res.status(200).json(userData)
      } catch (err) {
        console.error(err)
      } finally {
        await session.close()
      }
    } else {
      return res.sendStatus(500)
    }
  }
}

module.exports = {UserController}