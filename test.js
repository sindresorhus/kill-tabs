import test from 'ava';
import killTabs from './index.js';

test('main', async t => {
	await t.notThrowsAsync(killTabs({
		chrome: true,
	}));
});

test('chrome canary', async t => {
	await t.notThrowsAsync(killTabs({
		chromeCanary: true,
	}));
});
