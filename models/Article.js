//Dependencies
var mongoose = require('mongoose');

//creating schema class
var Schema = mongoose.Schema;

//creating article schema
var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	//sourceLink is unique to prevent storing duplicate articles
	sourceLink: {
		type: String,
		required: true,
		unique: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;