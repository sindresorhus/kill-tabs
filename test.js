import test from 'ava';
import killTabs from './index.js';

test('main', async t => {
	await t.notThrowsAsync(killTabs({
		chrome: true,
	}));
});
