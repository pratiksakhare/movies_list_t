var Movie = require('../models/movie.model.js');

exports.checkDuplicates = function(req, res, next) {
    let movie_item = {
        name : req.body.name,
        desc : req.body.desc,
        actors : req.body.actors,
        genre : req.body.genre,
        release : new Date(req.body.release)
    };
    req.movie_item = movie_item;
    Movie.find({name:movie_item.name, genre : movie_item.genre}, function(err, movies){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving movies."});
        } else {
            if (movies.length) {
                return res.status(200).send({message: "Movie already exists."});
            }
            next();
        }
    });
};

exports.create = function(req, res) {

    var movie = new Movie(req.movie_item);

    movie.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the movie."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Movie.find(function(err, movies){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving movies."});
        } else {
            res.send(movies);
        }
    });
};


exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
    let filter = {_id: req.params.movieId};
    let update_doc = {
        name : req.body.name,
        desc : req.body.desc,
        actors : req.body.actors,
        genre : req.body.genre,
        release : new Date(req.body.release),
    };
    console.log(filter, update_doc);
    Movie.findOneAndUpdate(filter, update_doc,{ new: true }, function(err, movie) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Could not find a Movie with id " + req.params.appearalId});
        }
        res.send(movie);

    });
};


exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    Movie.remove({_id: req.params.movieId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete Movie with id " + req.params.id});
        } else {
            res.send({message: "Movie deleted successfully!"})
        }
    });
};
