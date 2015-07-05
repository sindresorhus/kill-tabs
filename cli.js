#!/usr/bin/env node
'use strict';
var meow = require('meow');
var killTabs = require('./');

meow({
	help: [
		'Usage',
		'  $ kill-tabs'
	]
});

killTabs(function (err) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
});
