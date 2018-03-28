import * as chai from 'chai';
import 'mocha';

import { ListParser } from '../src/listParser';
import { TransformerConfig } from '../src/model/transformerConfig';
import { LineElementConfig } from '../src/model/lineElementConfig';

const expect = chai.expect;

function buildConfigWithElements(elementSeparator: string): TransformerConfig {
  const elementConfigs: LineElementConfig[] = [
    new LineElementConfig(4, elementSeparator),
  ];
  return new TransformerConfig(' ', elementConfigs);
}

const config = new TransformerConfig(' ');

const validLineWithSpaces =
  '0nuj7vqbzlnb        platadm_manageusersvc                             replicated          3/3                 sp3registry-on.azurecr.io/manageusersvc:1.1.30';

describe('ListParser', () => {
  describe('parseLine', () => {
    it('throws exception when line is undefined', () => {
      expect(() => {
        const listParser = new ListParser(config);
        let line: string;
        listParser.parseLine(line!);
      }).to.throw(ReferenceError);
    });

    it('should return some value for a valid line', () => {
      const listParser = new ListParser(config);
      expect(listParser.parseLine(validLineWithSpaces)).to.not.be.undefined;
    });

    it('should return a non-empty array for a valid line', () => {
      const listParser = new ListParser(config);
      let result: string[] = listParser.parseLine(validLineWithSpaces);
      expect(result.length).to.be.greaterThan(0);
    });

    it('should return correct values for a valid line', () => {
      const listParser = new ListParser(config);
      let result: string[] = listParser.parseLine(validLineWithSpaces);
      expect(result.length).to.equal(5);
    });

    it('for a valid line, values do not include separator', () => {
      const listParser = new ListParser(config);
      let result: string[] = listParser.parseLine(validLineWithSpaces);

      result.forEach(element => {
        expect(element.startsWith(config.lineSeparator)).to.be.false;
        expect(element.endsWith(config.lineSeparator)).to.be.false;
      });
    });

    it('doesnt split element when element separator is empty string', () => {
      let configWithElements = buildConfigWithElements('');

      const listParser = new ListParser(configWithElements);
      let result: string[] = listParser.parseLine(validLineWithSpaces);
      expect(result.length).to.equal(5);
    });

    it('splits element when element has separator', () => {
      let configWithElements = buildConfigWithElements(':');

      const listParser = new ListParser(configWithElements);
      let result: string[] = listParser.parseLine(validLineWithSpaces);
      expect(result.length).to.equal(6);
    });
  });
});
