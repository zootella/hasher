var stdin = process.stdin;
stdin.setRawMode(true); // so that we don't need a newline to receive data
stdin.setEncoding('utf8'); // no binary

// stdin is paused by default
exports.listen = function() {
	stdin.resume();
}

// fake event emitter...
exports.on = function(key, cb) {
	stdin.resume();

	stdin.on('data', function (k) {
		if (k === key) {
			cb();
		}

		if (k === '\u0003') process.exit();
	});
}
