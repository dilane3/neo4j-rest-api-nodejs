const express = require('express')
const {UserController} = require("../controllers/userController.js")
const { authenticationMiddleware } = require('../middlewares/authentication.js')

const {
  getAllUsers,
  getUser,
  updateUserName,
  deleteUser,
  addFriend,
  signin,
  signup
} = UserController

const userRouter = express.Router()

userRouter.get("/", authenticationMiddleware, getAllUsers)
userRouter.get("/:id", authenticationMiddleware, getUser)
userRouter.patch("/:id", authenticationMiddleware,updateUserName)
userRouter.delete("/:id", authenticationMiddleware, deleteUser)
userRouter.post("/add_friend", authenticationMiddleware, addFriend)
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)

module.exports = {userRouter}
