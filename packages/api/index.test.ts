import { expect, test } from 'bun:test';
import { ApiError, requirePermission } from './index';

test('permission evaluator rejects missing permissions', () => {
  expect(() =>
    requirePermission({ permissions: ['people.read'] } as never, 'payroll.run'),
  ).toThrow(ApiError);
});

test('permission evaluator accepts wildcard', () => {
  expect(() => requirePermission({ permissions: ['*'] } as never, 'payroll.run')).not.toThrow();
});
