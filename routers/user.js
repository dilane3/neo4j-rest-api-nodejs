const express = require('express')
const {UserController} = require("../controllers/userController.js")

const {
  getAllUsers,
  getUser,
  createUser,
  updateUserName,
  deleteUser,
  addFriend
} = UserController

const userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.post("/", createUser)
userRouter.patch("/:id", updateUserName)
userRouter.delete("/:id", deleteUser)
userRouter.post("/add_friend", addFriend)

module.exports = {userRouter}
