import * as chai from 'chai';
import 'mocha';

import { ListParser } from '../src/listParser';
import { TransformerConfig } from '../src/model/transformerConfig';
import { LineElementConfig } from '../src/model/lineElementConfig';

const expect = chai.expect;

function buildConfigWithElements(
  index: number,
  elementSeparator: string,
  instanceIndices: number[]
): TransformerConfig {
  const elementConfigs: LineElementConfig[] = [
    new LineElementConfig(index, elementSeparator, instanceIndices),
  ];
  return new TransformerConfig(' ', elementConfigs);
}

const config = new TransformerConfig(' ');

const validLineWithSpaces1 =
  '0nuj7vqbzlnb        platadm_manageusersvc                             replicated          3/3                 sp3registry-on.azurecr.io/manageusersvc:1.1.30';
const validLineWithSpaces2 =
  'cgqnemahi7xc        apigate_tyk_gateway                               replicated          3/3                 sp3registry-on.azurecr.io/tyk-gateway:1.1.9                                *:5001->8080/tcp';

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
      expect(listParser.parseLine(validLineWithSpaces1)).to.not.be.undefined;
    });

    it('should return a non-empty array for a valid line', () => {
      const listParser = new ListParser(config);
      let result: string[] = listParser.parseLine(validLineWithSpaces1);
      expect(result.length).to.be.greaterThan(0);
    });

    it('should return correct values for a valid line', () => {
      const listParser = new ListParser(config);
      let result: string[] = listParser.parseLine(validLineWithSpaces1);
      expect(result.length).to.equal(5);
    });

    it('for a valid line, values do not include separator', () => {
      const listParser = new ListParser(config);
      let result: string[] = listParser.parseLine(validLineWithSpaces1);

      result.forEach(element => {
        expect(element.startsWith(config.lineSeparator)).to.be.false;
        expect(element.endsWith(config.lineSeparator)).to.be.false;
      });
    });

    it('doesnt split element when element separator is empty string', () => {
      let configWithElements = buildConfigWithElements(4, '', [0]);

      const listParser = new ListParser(configWithElements);
      let result: string[] = listParser.parseLine(validLineWithSpaces1);
      expect(result.length).to.equal(5);
    });

    it('splits element when element has separator', () => {
      let configWithElements = buildConfigWithElements(4, ':', [0]);

      const listParser = new ListParser(configWithElements);
      let result: string[] = listParser.parseLine(validLineWithSpaces1);
      expect(result.length).to.equal(6);
    });

    it('should use element separator the correct number of times', () => {
      let configWithElements = buildConfigWithElements(1, '_', [0]);

      const listParser = new ListParser(configWithElements);
      let result: string[] = listParser.parseLine(validLineWithSpaces2);
      expect(result.length).to.equal(7);
    });
  });
});
