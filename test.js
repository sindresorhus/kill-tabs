'use strict';
var test = require('ava');
var killTabs = require('./');

test(function (t) {
	t.plan(1);

	killTabs(function (err) {
		t.assert(!err, err);
	});
});
