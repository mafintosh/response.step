# response.step

response.step is a small plugin for [root](https://github.com/mafintosh/root) that adds a `step` function to the response

	npm install response.step

response.step is useful is when nested async code needs to be flattened out a bit

``` js
var root = require('root');

var app = root();

app.use(require('response.step'));

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
```

response.step takes care of all our error handling for us.

``` js
app.get(function(request, response) {
	response.step(
		function(next) {
			next(new Error('bad stuff'));
		},
		function() {
			// i am never called
		}
	);
});

app.error(function(request, response) {
	// all errors are forwarded to me
});
```