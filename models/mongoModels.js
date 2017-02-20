var User = mongoose.model('User', 
{
    username: String,
    password: String,
    message: String,
    email: String
});