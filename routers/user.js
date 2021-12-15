const express = require('express')
const {UserController} = require("../controllers/userController.js")

const {
  getAllUsers,
  getUser,
  createUser
} = UserController

const userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.post("/", createUser)

module.exports = {userRouter}