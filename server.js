//DEPENDENCIES
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
//below may need to change depending on future lessons
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

//importing controller
// var routes = require('./controllers/controller.js');

//EXPRESS SERVER SETUP
var app = express();
var port = 8080;

//search for static content in public and serve it.
app.use(express.static(process.cwd() + '/public'));

// setting up body parser
app.use(bodyParser.urlencoded({ extended: false }));

//settung up handlebars usage
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//setting up the port to listen
app.listen(port, function() {
	console.log('App running on port ' + port);
});