var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function(){
    var userSchema = mongoose.Schema({
        name: String,
        password: String,
        email: String
    });
    var User = mongoose.model('User', userSchema);

    //var firstUser = new User({name: 'trial', password: '1234', email: 'a@a.com'});
    //firstUser.save();
});