import {promisify} from 'node:util';
import childProcess from 'node:child_process';
import execall from 'execall';

const TEN_MEBIBYTE = 1024 * 1024 * 10;

export default async function killTabs() {
	const command = 'wmic process where Caption=\'chrome.exe\' get CommandLine,ProcessId /format:list';
	const response = await promisify(childProcess.exec)(command, {maxBuffer: TEN_MEBIBYTE});

	if (response.stderr) {
		throw new Error('Failed to kill tabs.', {cause: new Error(response.stderr)});
	}

	return execall(/CommandLine=(.+)\s+ProcessId=(\d+)/g, response.stdout).map(element => ({
		cmd: element.subMatches[0],
		pid: Number.parseInt(element.subMatches[1], 10),
	}));
}
