// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase, index) => {
    test(`Test Case ${index + 1}: ${testCase.a} ${testCase.action} ${
      testCase.b
    } = ${testCase.expected}`, () => {
      const result = simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      });
      expect(result).toEqual(testCase.expected);
    });
  });
});
