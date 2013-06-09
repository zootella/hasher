var fs       = require('fs');
var crypto   = require('crypto');
var Hasher   = require('./lib/hasher');
var keyboard = require('./lib/keyboard');

var hasher = new Hasher();

// The meat of the app
var input = fs.createReadStream(process.argv[2], {bufferSize: 50 * 1024 * 1024});
input.pipe(hasher);

// Hasher fires 'end' event when it is complete
hasher.on('end', function(hex) {
	console.log("sha1 sum is: " + hex);
	process.exit();
});

// Just some logging
var dataLength = 0;
hasher.on('data', function(data) {
	dataLength += data.length;
	console.log('hashed ' + dataLength + ' bytes');
});

keyboard.on('p', function() {
	if(!input.paused) {
		console.log('pausing');
		input.pause();
	}
});

keyboard.on('r', function() {
	if(input.paused) {
		console.log('resuming');
		input.resume();
	}
});




//change this in steps without breaking it
//make the command line dialog box which can take input and show progress in place
//be able to run it standalone from the command line, and in a unit test from nodeunit
//you don't need pause and resume, just range, progress and stop



