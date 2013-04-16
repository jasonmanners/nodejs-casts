var express = require("express"),
    app = module.exports = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Add routes
require('./routes')(app)