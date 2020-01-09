'use strict';
const childProcess = require('child_process');
const pify = require('pify');
const execall = require('execall');

const TEN_MEBIBYTE = 1024 * 1024 * 10;

module.exports = async () => {
	const command = 'wmic process where Caption=\'chrome.exe\' get CommandLine,ProcessId /format:list';
	const stdout = await pify(childProcess.exec)(command, {maxBuffer: TEN_MEBIBYTE});

	return execall(/CommandLine=(.+)\s+ProcessId=(\d+)/g, stdout).map(element => ({
		cmd: element.subMatches[0],
		pid: parseInt(element.subMatches[1], 10)
	}));
};
