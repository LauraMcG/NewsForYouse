//news_controller handles the site routing.

//DEPENDENCIES
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

//MODELS
var Article = require('../models/Article.js');
var Comment = require('../models/Comment.js');

module.exports = function(app) {

	app.get('/', function(req, res) {

		Article.find({}, function (error, doc) {
			if (error) {
				console.log(error);
			} else {
				res.render('index', {articles: doc});
				// res.json(doc);
			}
		});
		
	});

	//basic scrape, no Mongoose. here for testing purposes.
	//DELETE IN FINAL VERSION
	app.get('/scrapearray', function(req, res) {
		request('http://www.reddit.com/r/futurology', function (error, response, html) {
			var $cheerio = cheerio.load(html);

			var result = [];

			$cheerio('a.title').each(function(error, response) {

				if (error) {
					console.log('There was an error: ' + error);
				}				

				//pulling the title and the source link
				var title = $cheerio(this).text();
				var sourceLink = $cheerio(this).attr('href');

				result.push({
					title: title,
					sourceLink: sourceLink
				});
			});
			res.send('Scrape success!');
		});
	});

	app.get('/scrapemongoose', function(req, res) {
		request('http://www.reddit.com/r/futurology', function (error, response, html) {
			//pulling the html from /r/futurology with cheerio
			var $cheerio = cheerio.load(html);
			//with cheerio, we select all of the a tags with a title class
			$cheerio('a.title').each(function(i, element) {
				//create an empty result object to store our data
				var result = {};
				//putting the title and source link of each article in a variable.
				result.title = $cheerio(this).text();
				result.sourceLink = $cheerio(this).attr('href');
				// creting a new article object with mongoose
				var entry = new Article(result);
				//storing the new entry to mongo. log any errors.
				entry.save(function(error, doc) {
					if (error) {
						console.log(error);
					} else {
						console.log(doc);
					}
				});

			});
		});
	});

//end module.exports
}