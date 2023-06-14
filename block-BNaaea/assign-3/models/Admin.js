var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var adminSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
},{timestamps:true});
adminSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  }
});
adminSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

module.exports = mongoose.model('Admin', adminSchema);
