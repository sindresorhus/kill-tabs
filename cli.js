#!/usr/bin/env node
import meow from 'meow';
import killTabs from './index.js';

const cli = meow(`
	Usage
	  $ kill-tabs

	Options
	  --no-chromium        Don't kill tabs in Chromium
	  --no-chrome          Don't kill tabs in Chrome
	  --no-chrome-canary   Don't kill tabs in Chrome Canary
	  --no-brave           Don't kill tabs in Brave
	  --no-edge            Don't kill tabs in Edge
`, {
	importMeta: import.meta,
	flags: {
		chromium: {
			type: 'boolean',
			default: true,
		},
		chrome: {
			type: 'boolean',
			default: true,
		},
		chromeCanary: {
			type: 'boolean',
			default: true,
		},
		brave: {
			type: 'boolean',
			default: true,
		},
		edge: {
			type: 'boolean',
			default: true,
		},
	},
});

killTabs(cli.flags);
