const { nanoid } = require("nanoid")
const {dbConnect} = require("../utils/database.js")

class UserModel {
  /**
   * This function get all the users
   * @returns AllUsers | Error message
   */
  async getAllUsers () {
    const session = dbConnect()
    try {
      const query = "MATCH (users:User) RETURN users"
      const users = await session.run(query)

      const usersData = users.records.map(user => {
        return user.get('users')?.properties
      })

      return {data: usersData}
    } catch(err) {
      return {error: 'error while getting users'}
    } finally {
      await session.close()
    }      
  }

  /**
   * This function get a specific user based on his id number
   * @param {Number} id 
   * @returns User | Error message
   */
  async getUser (id) {
    const session = dbConnect()

    try {
      const query = "MATCH (user:User{id: $id}) RETURN user"
      const user = await session.run(query, {id})

      if (user.records.length > 0) {
        const userData = user.records[0].get('user').properties

        return {data: userData}
      } else {
        return {data: null}
      }
    } catch (err) {
      return {error: "error occurs while getting a user"}
    } finally {
      await session.close()
    }
  }

  /**
   * This function create a new user using his name and his email address
   * @param {{name: String, email: String}} payload 
   * @returns User | Error message
   */
  async createUser (payload) {
    const session = dbConnect()
    const {name, email} = payload

    try {
      const query = "CREATE (user:User{id: $id, name: $name, email: $email}) RETURN user"
      const user = await session.run(query, {id: nanoid(), name, email})

      const userData = user.records[0].get('user').properties

      return {data: userData}
    } catch (err) {
      return {error: "error occurs while getting a user"}
    } finally {
      await session.close()
    }
  }

  /**
   * This function update the name of a user
   * @param {Number} id 
   * @param {String} name 
   * @returns User | Error message
   */
  async updateUser (id, name) {
    const session = dbConnect()

    try {
      const query = "MATCH (user:User{id: $id}) SET user.name = $name RETURN user"
      const user = await session.run(query, {id, name})

      if (user.records.length > 0) {
        const userData = user.records[0].get('user').properties

        return {data: userData}
      } else {
        return {data: null}
      }
    } catch (err) {
      return {error: "error occurs while updating a user"}
    } finally {
      await session.close()
    }
  }

  /**
   * This function delete a user based on his id
   * @param {Number} id 
   * @returns a message
   */
  async deleteUser (id) {
    const session = dbConnect()

    try {
      const query = "MATCH (user:User{id: $id}) DELETE user RETURN user"
      const user = await session.run(query, {id})

      if (user.records.length > 0) {
        return {data: "user deleted successfully"}
      } else {
        return {data: null}
      }
    } catch(err) {
      return {error: "error occurs while deleting a user"}
    } finally {
      session.close()
    }
  }
}

module.exports = {UserModel}