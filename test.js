import test from 'ava';
import m from '.';

test('main', async t => {
	await t.notThrows(m());
});
