'use strict';
var test = require('ava');
var killTabs = require('./');

test(function (t) {
	t.plan(1);

	killTabs(undefined, function (err) {
		t.assert(!err, err);
	});
});
