var mongoose = require('mongoose');

var AppearalSchema = mongoose.Schema({
    code: String,
    size: String,
    quality: String,
    price:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Appearal', AppearalSchema);
