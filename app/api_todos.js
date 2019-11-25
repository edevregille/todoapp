var Todo = require('./models/todo');

module.exports = function(app, newrelic) {

	// get all todos
	app.get('/api/todos', function(req, res) {
		newrelic.setTransactionName('Get all Todos (GET)');
		getTodos(res);// use mongoose to get all todos in the database
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		newrelic.addCustomAttribute('item', req.body.text);
		newrelic.setTransactionName('Create Todo (POST)');
		createTodo(req, res);
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		newrelic.setTransactionName('Delete Todo (DELETE)');
		deleteToDo(req, res);
	});


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};

// Retrieve all ToDo items stored in DB
function getTodos(res){
	Todo.find(function(err, todos) {
		if (err) // if there is an error retrieving, send the error. nothing after res.send(err) will execute
			res.send(err)
		res.json(todos); // return all todos in JSON format
	});
};

// Create a new ToDo item in Mongo
function createTodo(req, res){
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo) {
		if (err) res.send(err);
		getTodos(res); // get and return all the todos after you create another
	});
};

// Delete a ToDo item in Mongo
function deleteToDo(req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err) res.send(err);
		getTodos(res);
	});
};