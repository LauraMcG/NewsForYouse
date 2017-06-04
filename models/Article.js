//Dependencies
var mongoose = require('mongoose');

//creating schema class
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	sourceLink: {
		type: String,
		required: true,
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;