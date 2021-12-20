const { nanoid } = require("nanoid")
const {dbConnect} = require("../utils/database.js")

class ArticleModel {
  async getAllArticles() {
    const session = dbConnect()

    try {
      const query = "MATCH (articles:Article) RETURN articles"
      const articles = await session.run(query)

      const articlesData = articles.records.map(article => {
        return article.get("articles").properties
      })

      return {data: articlesData}
    } catch (err) {
      return {error: "Error while getting all articles"}
    } finally {
      await session.close()
    }
  }

  async getArticle(id) {
    const session = dbConnect()

    try {
      const query = "MATCH (article:Article{id: $id}) RETURN article"
      const article = await session.run(query, {id})

      if (article.records.length > 0) {
        const articleData = article.records[0].get("article").properties

        return {data: articleData}
      } else {
        return {data: null}
      }
    } catch (err) {
      return {error: "Error while getting a specific article"}
    } finally {
      await session.close()
    }
  }

  async createArticle(articlePayload) {
    const session = dbConnect()
    const {title, content, userId} = articlePayload

    try {
      const query = `
        MATCH (user:User{id: $userId})
        CREATE 
          (article:Article{id: $articleId, title: $title, content: $content, created_at: $articleDate}),
          (user) -[:CREATED]-> (article),
          (article) -[:CREATED_BY]-> (user)

        RETURN article
      `

      console.log(query)

      const article = await session.run(query, {
        userId,
        articleId: nanoid(),
        title,
        content,
        articleDate: Date.now()
      })

      const articleData = article.records[0].get("article").properties

      return {data: articleData}
    } catch (err) {
      console.log(err)
      return {error: "Error while creating an article"}
    } finally {
      await session.close()
    }
  }

  async deleteArticle({id, userId}) {
    const session = dbConnect()

    try {
      const query = `
        MATCH 
          (user:User{id: $userId}),
          (article:Article{id: $articleId}) -[c1:CREATED_BY]-> (author:User),
          (author) -[c2:CREATED]-> (article)
        WHERE user.id = author.id
        DELETE c1, c2, article
      `

      await session.run(query, {
        userId,
        articleId: id
      })

      return {data: "article deleted successfully"}
    } catch (err) {
      console.log(err)
      return {error: "Error occurs while deleting an article"}
    } finally {
      await session.close()
    }
  }
}

module.exports = {ArticleModel}