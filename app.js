require("dotenv").config()
const express = require("express")
const {userRouter} = require("./routers/user.js")

// initialization of an app instance
const app = express()

const {
  PORT
} = process.env

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`)
})