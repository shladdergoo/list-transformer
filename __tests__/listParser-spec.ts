import { ListParser } from '../src/listParser';
import { TransformerConfig } from '../src/model/transformerConfig';

const config = new TransformerConfig(' ');

const validLineWithSpaces =
  '0nuj7vqbzlnb        platadm_manageusersvc                             replicated          3/3                 sp3registry-on.azurecr.io/manageusersvc:1.1.30';

test('null line throws exception', () => {
  expect(() => {
    const listParser = new ListParser(config);
    listParser.parseLine(null);
  }).toThrowError(ReferenceError);
});

test('undefined line throws exception', () => {
  expect(() => {
    const listParser = new ListParser(config);
    let line: string;
    listParser.parseLine(line);
  }).toThrowError(ReferenceError);
});

test('valid line, returns some value', () => {
  const listParser = new ListParser(config);
  expect(listParser.parseLine(validLineWithSpaces)).toBeDefined();
});

test('valid line, returns a non-empty array', () => {
  const listParser = new ListParser(config);
  let result: string[];
  result = listParser.parseLine(validLineWithSpaces);
  expect(result.length).toBeGreaterThan(0);
});

test('valid line, returns correct values', () => {
  const listParser = new ListParser(config);
  let result: string[];
  result = listParser.parseLine(validLineWithSpaces);
  expect(result.length).toEqual(5);
});

test('valid line, values do not include separator', () => {
  const listParser = new ListParser(config);
  let result: string[];
  result = listParser.parseLine(validLineWithSpaces);

  result.forEach(element => {
    expect(element.startsWith(config.lineSeparator)).toBeFalsy;
    expect(element.endsWith(config.lineSeparator)).toBeFalsy;
  });
});
