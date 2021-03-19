module.exports = app => {
    const articles = require("../controllers/article.controller.js");
  
    // Create a new Customer
    app.post("/articles", articles.create);
  
    // Retrieve all Customers
    app.get("/aryicles", articles.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/articles/:articlesSports", articles.findOne);
  
    // Update a Customer with customerId
    app.put("/articles/:articlesSports", articles.update);
  
    // Delete a Customer with customerId
    app.delete("/articles/:articlesSpoprts", articles.delete);

    // Create a new Customer
  app.delete("/articles", articles.deleteAll);
};