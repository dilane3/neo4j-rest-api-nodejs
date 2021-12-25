require("dotenv").config()

const jwt = require("jsonwebtoken")

const {
  SECRET_CODE
} = process.env

const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(" ")[1]
  
    if (!token) {
      console.log("not here")
      return res.status(401).json({message: "Not authorized"})
    }

    console.log({token})
    jwt.verify(token, SECRET_CODE, (error, data) => {
      if (error) {
        return res.status(401).json({message: "Not authorized"})
      }

      console.log(data)
      next()
    })
  } catch (err) {
    return res.status(401).json({message: "Not authorized"})
  }

}

module.exports = {authenticationMiddleware}