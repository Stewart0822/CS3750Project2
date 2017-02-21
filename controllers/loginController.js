/*var UserSchema = require('mongoose').model('User').schema;

module.exports = function(app){

    /*app.post("/login", function(request,response){
        console.log("in the login post func");
        authenticate(request.body.username, request.body.password, function (err, user){
            if (user) {

                response.redirect('/chat');
            } else {
                res.redirect('/users/login');
            }
        })
    });

    function authenticate(name, pass, fn) {
        if (!module.parent) console.log('auth');

        User.findOne({
            username: name
        },
        
        function (err, user){
            if (user) {
                if (err) return fn(new Error('cannot find user'));
                if (password == user.password) return fn(null, user);
            } else {
                return fn(new Error('cannot find user'));
            }
        });
    }
    
    function init(){

        var serverBaseUrl = document.domain;
        var socket = io.connect(serverBaseUrl + ":3000");

        function loginNow() {
            var username = $('#username').val();
            var password = $('#password').val();
            console.log("in the loginnow func");
            $.ajax({
                url: '/login',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({ username: username, password: password })
            });
            
            /*console.log ('right before findOne');
            User.findOne({'username': username },
                function (err, user) {
                    if (err)
                        return false;

                    if (!user) {
                        console.log('Not Found');
                        return false;
                    }
                    if (!isValidPassword(username, password)){
                        console.log('wrongpassword');
                        return false;
                    }
                    console.log('found trial!')

                    return true;
                
                }
            );

            var isValidPassword = function (user, password){
                return user.password == password;
            }
    
            $.ajax({
                url: '/login',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({ username: username, password: password })
            });
        }

                $('#loginBtn').on('click', loginNow);
        }
        console.log('test2');
        $(document).on('ready', init);

    }
}*/