const Article = require("../models/article.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  
        // Validate request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        // Create an article
        const article = new Article({
          sports: req.body.sports,
          entertainment: req.body.entertainment,
          politics: req.body.politics
        });
      
        // Save Customer in the database
        Article.create(article, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Article."
            });
          else res.send(data);
        });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  
        Article.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving articles."
            });
          else res.send(data);
        });

};

// Find single article
exports.findOne = (req, res) => {
  
        Article.findBySports(req.params.articleSports, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Article with sports ${req.params.articleSports}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Article with sports " + req.params.articleSports
              });
            }
          } else res.send(data);
        });

};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Article.updateBySports(
        req.params.articleSports,
        new Article(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found artical with id ${req.params.articleSports}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Article with id " + req.params.articleSports
              });
            }
          } else res.send(data);
        }
      );
    
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.articleSports, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Article with id ${req.params.articleSports}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Article with id " + req.params.articleSports
            });
          }
        } else res.send({ message: `Article was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
        Articles.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all articles."
            });
          else res.send({ message: `All Articles were deleted successfully!` });
        });
};