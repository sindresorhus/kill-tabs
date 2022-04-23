import {promisify} from 'node:util';
import childProcess from 'node:child_process';
import execall from 'execall';

const TEN_MEBIBYTE = 1024 * 1024 * 10;

export default async function killTabs() {
	const command = 'wmic process where Caption=\'chrome.exe\' get CommandLine,ProcessId /format:list';
	const res = await promisify(childProcess.exec)(command, {maxBuffer: TEN_MEBIBYTE});

	if (res.stderr) {
		console.error(res.stderr)
		process.exit(1)
	}

	return execall(/CommandLine=(.+)\s+ProcessId=(\d+)/g, res.stdout).map(element => ({
		cmd: element.subMatches[0],
		pid: Number.parseInt(element.subMatches[1], 10),
	}));
}
