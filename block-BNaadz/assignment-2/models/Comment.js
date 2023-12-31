var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var commentSchema = new Schema(
  {
    comment: { type: String,required:true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
