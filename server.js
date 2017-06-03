//server is the entry point into the app.

//DEPENDENCIES
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

mongoose.Promise = Promise;

//MODELS will go here

//EXPRESS SERVER SETUP
var app = express();
var port = 8080;

//search for static content in public and serve it.
app.use(express.static(process.cwd() + '/public'));

//MONGOOSE DB CONFIGURATION
mongoose.connect('mongodb://localhost/newsforyouse');
var db = mongoose.connection;

//display mongoose errors
db.on('error', function(error) {
	console.log('Mongoose Error: ', error);
});

//success message after logging into database through Mongoose
db.once('open', function() {
	console.log('Mongoose connected!');
})

// BODY PARSER SETUP
app.use(bodyParser.urlencoded({ extended: false }));

//HANDLEBARS SETUP
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//IMPORTING CONTROLLER
var routes = require('./controllers/news_controller')(app);

//setting up the port to listen
app.listen(port, function() {
	console.log('App running on port ' + port);
});