var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(express.cookieParser());

app.use(function (req, res, next) {

    res.render('Layout.jade', {code: 500});
})

app.get(function(req, res)
{
    res.render('Layout.jade', { code: 2});
});

app.listen(3000)