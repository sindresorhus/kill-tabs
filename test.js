import test from 'ava';
import fn from './';

test(t => {
	t.plan(1);
	fn(err => t.ifError(err));
});
