/* Main application entry file. Please note, the order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    app = express();

require('express-namespace');


//  ------ CLEAN UP
// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./authorization')

// Bootstrap db connection
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect(config.db)


app.use(express.static(__dirname + '/public'))
app.use(express.logger(':method :url :status'))
// ------------------------


var admin = require("./lib/admin"),
    casts = require("./lib/casts");

//Precedence Matters
app.use(admin);
app.use(casts);

//  ------ CLEAN UP
var port = process.env.PORT || 3000
app.listen(port)
console.log('Express app started on port '+port)
// ------------------------