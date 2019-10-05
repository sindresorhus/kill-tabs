'use strict';
const fkill = require('fkill');
let psList = require('ps-list');

if (process.platform === 'win32') {
	psList = require('./win');
}

module.exports = async (options = {}) => {
	const list = await psList();

	const processes = {
		chrome: process.platform === 'darwin' ? 'Chrome Helper' : 'chrome',
		chromium: process.platform === 'darwin' ? 'Chromium Helper' : 'chromium',
		brave: process.platform === 'darwin' ? 'Brave Helper' : 'brave'
	};

	if (options.chromium === false) {
		delete processes.chromium;
	}

	if (options.chrome === false) {
		delete processes.chrome;
	}

	if (options.brave === false) {
		delete processes.brave;
	}

	const pids = list
		.filter(x =>
			Object.keys(processes).some(name => x.cmd.includes(processes[name])) &&
			x.cmd.includes('--type=renderer') &&
			!x.cmd.includes('--extension-process')
		)
		.map(x => x.pid);

	return fkill(pids, {force: true});
};
