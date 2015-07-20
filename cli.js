#!/usr/bin/env node
'use strict';
var meow = require('meow');
var killTabs = require('./');

var cli = meow({
	help: [
		'Usage: kill-tabs [OPTIONS]',
		'  --no-chromium       Do not kill tabs from Chromium',
		'  --no-chrome         Do not kill tabs from Chrome'
	]
});

killTabs(cli.flags, function (err) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
});
