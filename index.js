var util = require('util');

module.exports = function(app) {
	app.use('response.step', function() {
		var response = this;
		var steps = arguments;
		var i = 0;

		var loop = function(err, val) {
			if (err && !util.isError(err)) {
				val = err;
				err = null;
			}

			if (err) return response.error(err);
			if (i > steps.length) return;

			var step = steps[i++];

			if (step.length > 1)  return step(val, loop);
			if (i < steps.length) return step(loop);

			step(val);
		};

		loop();
	});
};