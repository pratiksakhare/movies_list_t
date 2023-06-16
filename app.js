var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    console.log("Input Request : ", req.method, req.path);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});

require('./app/routes/movie.routes.js')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});

module.exports = app;

