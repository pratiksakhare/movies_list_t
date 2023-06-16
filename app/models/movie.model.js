var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
    name: String,
    desc: String,
    actors: String,
    genre:String,
    release:Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);
