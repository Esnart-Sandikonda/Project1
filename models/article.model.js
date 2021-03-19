const sql = require("./db.js");

// constructor
const Article = function(article) {
  this.sports = article.sports;
  this.entertainment = article.entertainment;
  this.politics = article.politics;
};

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created article: ", { id: res.insertId, ...newArticle });
    result(null, { id: res.insertId, ...newArticle });
  });
};

Article.findBySports = (articlesSports, result) => {
  sql.query(`SELECT * FROM articles WHERE id = ${articlesSports}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found articles: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Article.getAll = result => {
  sql.query("SELECT * FROM articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("articles: ", res);
    result(null, res);
  });
};

Article.updateBySports = (sports, article, result) => {
  sql.query(
    "UPDATE articles SET sports = ?, entertainment = ?, politics = ?",
    [article.sports, article.entertainment, article.politics],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
          // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Article.remove = (sports, result) => {
  sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted article with sports: ", sports);
      result(null, res);
    });
  };
  
  Article.removeAll = result => {
    sql.query("DELETE FROM articles", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log(`deleted ${res.affectedRows} articles`);
    result(null, res);
  });
};

module.exports = Article;
