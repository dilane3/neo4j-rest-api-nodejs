const { ArticleModel } = require("../models/articleModel");

class ArticleController {
  static getAllArticles = async (req, res) => {
    const article = new ArticleModel()

    const {data, error} = await article.getAllArticles()

    if (data) {
      return res.status(200).json(data)
    } else {
      return res.status(500).json(error)
    }
  }

  static getArticle = async (req, res) => {
    const {id} = req.params

    if (id) {
      const article = new ArticleModel()

      const {data, error} = await article.getArticle(id)

      if (data !== undefined) {
        return res.status(200).json(data)
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static createArticle = async (req, res) => {
    const {title, content, userId} = req.body

    if (title, content, userId) {
      const article = new ArticleModel()

      const {data, error} = await article.createArticle({title, content, userId})

      if (data) {
        return res.status(201).json(data)
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static deleteArticle = async (req, res) => {
    const {id} = req.params
    const {userId} = req.body

    if (id, userId) {
      const article = new ArticleModel()

      const {data, error} = await article.deleteArticle({id, userId})

      if (data) {
        return res.status(200).json(data)
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }
}

module.exports = {ArticleController}