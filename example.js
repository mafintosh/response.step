var root = require('root');

var app = root();

app.use(require('response.step'));

app.get(function(request, response) {
	response.step(
		function(next) {
			next()
		},
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