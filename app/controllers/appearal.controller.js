var Appearal = require('../models/appearal.model.js');

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body.code) {
        res.status(400).send({message: "code can not be empty"});
    }
    let appearal_item = {
        code : req.body.code,
        size : req.body.size,
        quality : req.body.quality,
        price : req.body.price,
    }
    var appearal = new Appearal(appearal_item);

    appearal.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Appearal.find(function(err, appearals){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(appearals);
        }
    });
};

exports.find = function(req, res) {
    // Find a single note with a noteId
    let filter = {
        "size" : req.params.size,
        "quality" : req.params.quality
    }
    Appearal.find(filter, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve note with id " + req.params.noteId});
        } else {
            res.send(data);
        }
    });
};

exports.findCheap = function(req, res) {
    // Find a single note with a noteId
    let filter = {
        "size" : req.params.size,
        "quality" : req.params.quality
    }
    Appearal.find(filter, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve note with id " + req.params.noteId});
        } else {
            data = data.map(x=>x._doc);
            let cheap = data.sort((x,y) => x.price-y.price);
            res.send(cheap[0]);
        }
    });
};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
    let filter = {code : req.params.code, size : req.params.size};
    let update_doc = {price : req.body.price, quality : req.body.quality};
    Appearal.findOneAndUpdate(filter, update_doc, function(err, appearal) {
        if(err) {
            res.status(500).send({message: "Could not find a Appearal with id " + req.params.appearalId});
        }
        res.send(appearal);

    });
};

exports.updateMany = function(req, res) {
    // Update a note identified by the noteId in the request

    var criteria = {
        code:{ $in: req.body.codes},
        size:{ $in: req.body.sizes},
    };
    let update_doc = {price : req.body.price, quality : req.body.quality};
    Appearal.update(criteria, update_doc, { multi: true }, function(err, appearal) {
        if(err) {
            res.status(500).send({message: "Could not find a Appearal with id " + req.params.appearalId});
        }
        res.send(appearal);
    });
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    Appearal.remove({_id: req.params.appearalId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete Appearal with id " + req.params.id});
        } else {
            res.send({message: "Note deleted successfully!"})
        }
    });
};

