import { createLog } from '../../src/helper';
import { ErrorLog } from '../../src/ErrorLog';

describe('helper tests', () => {
  describe('createLog test', () => {
    it('Should return ErrorLog instance', () => {
      const result = createLog('2021-08-09T02:12:51.259Z', 'error', '{"transactionId":"1","error":"not found"}');

      expect(result).toBeInstanceOf(ErrorLog);
    });

    it('Should throw error when level is not supported', () => {
      try {
        createLog('2021-08-09T02:12:51.259Z', 'warn', '{"transactionId":"1","info":"not found"}');

      } catch(error: any) {
        expect(error.message).toBe('Log level is not supported.');
      }
    });
  });
});
