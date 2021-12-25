const { UserModel } = require("../models/userModel.js")


class UserController {
  static getAllUsers = async (req, res) => {
    const user = new UserModel()

    const {data, error} = await user.getAllUsers()

    if (data) {
      return res.status(200).json(data)
    } else {
      return res.status(500).json(error)
    }
  }

  static getUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      const user = new UserModel()

      const {data, error} = await user.getUser(id)

      if (data !== undefined) {
        res.status(200).json(data)
      } else {
        res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static signup = async (req, res) => {
    const {name, email} = req.body

    if (name && email) {
      const user = new UserModel()

      const {data, error} = await user.signup({name, email})

      if (data) {
        res.status(201).json(data)
      } else {
        res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static signin = async (req, res) => {
    const {username} = req.body

    if (username) {
      const user = new UserModel()

      const {data, error} = await user.signin(username)

      if (data !== undefined) {
        res.status(201).json(data)
      } else {
        res.status(500).json(error)
      } 
    } else {
      res.sendStatus(500)
    }
  }

  static updateUserName = async (req, res) => {
    const {id} = req.params
    const {name} = req.body

    if (id, name) {
      const user = new UserModel()

      const {data, error} = await user.updateUser(id, name)

      if (data !== undefined) {
        res.status(200).json(data)
      } else {
        res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static deleteUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      const user = new UserModel()

      const {data, error} = await user.deleteUser(id)

      if (data !== undefined) {
        res.status(200).json(data)
      } else {
        res.status(500).json(error)
      }
    } else {
      res.sendStatus(500)
    }
  }

  static addFriend = async (req, res) => {
    const {id1, id2, heart} = req.body

    if (id1, id2) {
      const user = new UserModel()

      const {data, error} = await user.addFriend(id1, id2, heart)

      if (data !== undefined) {
        res.status(201).json(data)
      } else {
        res.status(500).json(error)
      }
    } else {
      res.sendStatus(500)
    }
  }
}

module.exports = {UserController}