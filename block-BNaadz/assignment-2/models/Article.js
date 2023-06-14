var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
