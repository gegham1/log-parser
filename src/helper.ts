import { ErrorLog } from './ErrorLog';
import { Log, LogLevel } from './Log';

export function createLog(timestamp: string, level: string, data: string): Log {
	const payload = JSON.parse(data);

	switch(level) {
		case LogLevel.ERROR:
			return new ErrorLog(
				new Date(timestamp),
				level,
				payload.transactionId,
				payload.err
			);
		default:
			throw new Error('Log level is not supported.');
	}
}
