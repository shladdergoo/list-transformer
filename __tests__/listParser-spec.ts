import { ListParser } from '../src/listParser';

test('null line throws exception', () => {

  expect(() => {
    const listParser = new ListParser();
    listParser.parseLine(null);
  }).toThrowError(ReferenceError);
});
