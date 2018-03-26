import { ListParser } from '../src/listParser';

const validLineWithSpaces =
  '0nuj7vqbzlnb        platadm_manageusersvc                             replicated          3/3                 sp3registry-on.azurecr.io/manageusersvc:1.1.30';

test('null line throws exception', () => {
  expect(() => {
    const listParser = new ListParser();
    listParser.parseLine(null);
  }).toThrowError(ReferenceError);
});

test('valid line speparated by spaces returns a value', () => {
  const listParser = new ListParser();
  expect(listParser.parseLine(validLineWithSpaces)).toBeDefined();
});

test('valid line speparated by spaces returns a non-empty array', () => {
  const listParser = new ListParser();
  let result: string[];
  result = listParser.parseLine(validLineWithSpaces);
  expect(result.length).toBeGreaterThan(0);
});

test('valid line speparated by spaces returns correct values', () => {
  const listParser = new ListParser();
  let result: string[];
  result = listParser.parseLine(validLineWithSpaces);
  expect(result.length).toEqual(5);
});

test('valid line speparated by spaces, values do not include spaces', () => {
  const listParser = new ListParser();
  let result: string[];
  result = listParser.parseLine(validLineWithSpaces);

  result.forEach(element => {
    expect(element.startsWith(' ')).toBeFalsy;
    expect(element.endsWith(' ')).toBeFalsy;
  });
});
