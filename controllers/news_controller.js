//news_controller handles the site routing.

//DEPENDENCIES
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index');
	});

	// app.get('/scrape', function(req, res) )

	
//end module.exports
}