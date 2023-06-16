var validate = require('express-jsonschema').validate;
// var ValidationError = require("express-json-validator-middleware").ValidationError;
var schema = require('../schema/movie.schema');
module.exports = function(app) {

    var movie = require('../controllers/movie.controller.js');

    // Create 
    app.post('/movie/create', validate({body : schema.createApiSchema}), movie.checkDuplicates, movie.create);

    // Retrieve all
    app.get('/movies', movie.findAll);

    // Update 
    app.put('/movie/update/:movieId', validate({body : schema.updateApiSchema}), movie.update);

    // Delete
    app.delete('/movie/delete/:movieId', movie.delete);
    app.use((error, request, response, next) => {
        // Check the error is a validation error
        if (error &&  error.validations && error.validations.body && error.validations.body.length) {
          // Handle the error
          response.status(400).send(error.validations.body[0]);
          next();
        } else {
          console.log(error);
          next("something went wrong");
        }
      });
}