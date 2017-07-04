//server is the entry point into the app.

//DEPENDENCIES
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');
var methodOverride = require('method-override');

mongoose.Promise = Promise;

var Art = require('./models/Art.js');

//MODELS
var Article = require('./models/Article.js');
var Comment = require('./models/Comment.js');


//EXPRESS SERVER SETUP
var app = express();
var port = process.env.PORT || 8080;


// BODY PARSER SETUP
app.use(bodyParser.urlencoded({ extended: false }));


//search for static content in public and serve it.
app.use(express.static(process.cwd() + '/public'));

//METHOD-OVERRIDE SETUP
app.use(methodOverride("_method"));


//MONGOOSE CONFIGURATION
mongoose.connect('');
var db = mongoose.connection;

//display mongoose errors
db.on('error', function(error) {
	console.log('Mongoose Error: ', error);
});

//success message after logging into database through Mongoose
db.once('open', function() {
	console.log('Mongoose connected!');
});

//HANDLEBARS SETUP
//creating partial directory
var hbs = exphbs.create({
		defaultLayout: 'main', 
		partialsDir:['./views/partials/']
});

app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');

//IMPORTING CONTROLLER ROUTES
var routes = require('./controllers/news_controller')(app);

//LISTEN TO PORT
app.listen(port, function() {
	console.log('App running on port ' + port);
});