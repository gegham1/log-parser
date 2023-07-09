export enum LogLevel {
	ERROR = 'error',
	INFO = 'info',
	DEBUG = 'debug',
	WARN = 'warn',
}

export abstract class Log {
	constructor(public timestamp: Date, public loglevel: LogLevel, public transactionId: string) {}
}