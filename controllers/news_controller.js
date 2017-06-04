//news_controller handles the site routing.

//DEPENDENCIES
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/scrape', function(req, res) {
		request('http://www.reddit.com/r/futurology', function (error, response, html) {
			var $cheerio = cheerio.load(html);

			var result = [];

			$cheerio('a.title').each(function(error, response) {

				if (error) {
					console.log('There was an error: ' + error);
				}				

				//pulling the title and the source link
				var title = $cheerio(this).text();
				var sourceLink = $cheerio(this).children().attr('href');

				result.push({
					title: title,
					sourceLink: sourceLink
				});
			});

			console.log(result);
			
		});


	});


//end module.exports
}