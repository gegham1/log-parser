import { Readable } from 'stream';
import { LogParser } from '../../src/LogParser';
import { Log } from '../../src/Log';

describe('LogParser tests', () => {
  it('Should transform lines into Log instanes', async () => {
    const instance = new LogParser();
    const lines = [
      '2021-08-09T02:12:51.259Z - error - {"transactionId":"1","error":"not found"}',
    ];
    const result: Log[] = [];

    const logs = Readable.from(lines, { objectMode: true })
    .pipe(instance);

    for await (const log of logs) {
      result.push(log);
    }

    expect(result[0]).toBeInstanceOf(Log);
  });
});
