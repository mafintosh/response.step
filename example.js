var root = require('root');

var app = root();

app.use(require('response.step'));

app.get('/crash', function(request, response) {
	response.step(
		function(next) {
			next(new Error('crash!'));
		},
		function() {
			// we never get here
		}
	);
});

app.get(function(request, response) {
	response.step(
		function(next) {
			setTimeout(next, 300);
		},
		function(next) {
			setTimeout(next, 500);
		},
		function() {
			response.send('waiting approx 800ms!\n');
		}
	);
});

app.listen(8080);