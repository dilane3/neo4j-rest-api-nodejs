require("dotenv").config()

const { nanoid } = require("nanoid")
const {dbConnect} = require("../utils/database.js")

class UserController {
  static getAllUsers = async (req, res) => {
    const session = dbConnect()
    try {
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
    const session = dbConnect()
    const {id} = req.params

    if (id) {
      try {
        const query = "MATCH (user:User{id: $id}) RETURN user"
        const user = await session.run(query, {id})

        if (user.records.length > 0) {
          const userData = user.records[0].get(0).properties

          res.status(200).json(userData)
        } else {
          res.status(200).json(null)
        }
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
    const session = dbConnect()
    const {name, email} = req.body

    if (name && email) {
      try {
        const query = "CREATE (user:User{id: $id, name: $name, email: $email}) RETURN user"
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