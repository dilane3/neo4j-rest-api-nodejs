const express = require('express')
const {ArticleController} = require("../controllers/articleController.js")

const articleRouter = express.Router()

const {
  getAllArticles,
  getArticle,
  createArticle,
  deleteArticle
} = ArticleController

articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getArticle)
articleRouter.post("/", createArticle)
articleRouter.delete("/:id", deleteArticle)

module.exports = {articleRouter}