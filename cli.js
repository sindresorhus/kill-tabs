#!/usr/bin/env node
import meow from 'meow';
import killTabs from './index.js';

const cli = meow(`
	Usage
	  $ kill-tabs

	Options
	  --no-chromium  Don't kill tabs in Chromium
	  --no-chrome    Don't kill tabs in Chrome
	  --no-brave     Don't kill tabs in Brave
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
		brave: {
			type: 'boolean',
			default: true,
		},
	},
});

killTabs(cli.flags);
