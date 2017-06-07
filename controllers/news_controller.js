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
		//eventually, put scarping functionality here

		//get all articles from database and display on index
		Article.find({}, function (error, doc) {
			if (error) {
				console.log(error);
			} else {
				res.render('index', {articles: doc});
				// res.json(doc);
			}
		});
	});

//!! move this functionality into the get for index
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

	//display individual article page (with comments)
	app.get('/articles/:id', function (req, res) {
		console.log('the req.params.id for the get is: ' + req.params.id);

		Article.findOne({ "_id": req.params.id })
		.populate('comment')

		.exec( function (error, doc) {
			if(error) {
				console.log(error);
			} else {
				res.render('comments', {articles: doc});
			}
		});
	});

	app.post('/articles/:id', function(req, res) {
		console.log('the req.params.id for the get is: ' + req.params.id);
		
		var newComment = new Comment(req.body);

		newComment.save(function(error, doc) {
			if(error) {
				console.log(error);
			} else {
				console.log(doc);

				Article.findOneAndUpdate({ "_id": req.params.id }, {"comment": doc._id})

				.exec(function(err, doc){
					if (err) {
						console.log(err);
					} else {
						res.send(doc);
					}
				});


			}
		});
	});

//end module.exports
}