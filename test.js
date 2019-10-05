import test from 'ava';
import killTabs from '.';

test('main', async t => {
	await t.notThrowsAsync(killTabs());
});
