#!/usr/bin/env node
'use strict';
var meow = require('meow');
var killTabs = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ kill-tabs',
		'',
		'Options',
		'  --no-chromium  Don\'t kill tabs in Chromium',
		'  --no-chrome    Don\'t kill tabs in Chrome'
	]
});

killTabs(cli.flags, function (err) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
});
