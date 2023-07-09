import { Log, LogLevel } from "./Log";

export class ErrorLog extends Log {
	public err: string;
	constructor(timestamp: Date, loglevel: LogLevel, transactionId: string, err: string) {
		super(timestamp, loglevel, transactionId);
		this.err = err;
	}
}
