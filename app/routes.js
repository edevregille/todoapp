
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	app.get('/chat', function(req, res) {
		res.sendfile('./public/chat.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};