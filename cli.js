#!/usr/bin/env node
'use strict';
const meow = require('meow');
const killTabs = require('.');

const cli = meow(`
	Usage
	  $ kill-tabs

	Options
	  --no-chromium  Don't kill tabs in Chromium
	  --no-chrome    Don't kill tabs in Chrome
`, {
	flags: {
		chromium: {
			type: 'boolean',
			default: true
		},
		chrome: {
			type: 'boolean',
			default: true
		}
	}
});

killTabs(cli.flags);
