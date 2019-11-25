var mongoose = require('mongoose');
var url_db = (require('../config/configuration.js')).url_db;

//mongoose.connect(url_db, {server:{auto_reconnect:true}});
mongoose.connect(url_db, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('connecting', function() {
    console.log('connecting');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('connected', function() {
    console.log('connected!');
});

db.once('open', function() {
    console.log('connection open');
});

db.on('reconnected', function () {
    console.log('reconnected');
});

db.on('disconnected', function() {
    console.log('disconnected');
    mongoose.connect(url_db, {useNewUrlParser: true});
});
