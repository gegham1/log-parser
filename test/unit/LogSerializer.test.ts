import { Readable } from 'stream';
import { JsonSerializer } from '../../src/JsonSerializer';
import { LogLevel } from '../../src/Log';
import { ErrorLog } from '../../src/ErrorLog';

describe('JsonSerializer tests', () => {
  it('Should serialize logs into JSON', async () => {
    const instance = new JsonSerializer();
    const logs = [
      new ErrorLog(new Date(), LogLevel.ERROR, "1", "not found"),
    ];
    const result: string[] = [];

    const serializedLogs = Readable.from(logs, { objectMode: true })
    .pipe(instance);

    for await (const chunks of serializedLogs) {
      result.push(chunks);
    }

    const serializedLog = JSON.stringify({
      ...logs[0],
      timestamp: logs[0].timestamp.getTime(),
    });

    expect(result.join('')).toBe(
      `[${serializedLog}]`
    );
  });
});
