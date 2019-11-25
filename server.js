// set up ====================================================================== var newrelic = require('newrelic');
var newrelic = require('newrelic')
var express  = require('express');
var app      = express();
var port  	 = process.env.PORT || 8888;
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

// database ======================================================================
require('./app/database.js');

// api ======================================================================
require('./app/api_todos.js')(app, newrelic);

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);