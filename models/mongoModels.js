var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema( 
{
    username: String,
    password: String,
    message: String,
    email: String
});

var User = mongoose.model('users', UserSchema);

module.exports = User;