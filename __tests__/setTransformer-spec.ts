import * as chai from 'chai';
import 'mocha';

import { ISetTransformer } from '../src/interface/isetTransformer';
import { SetTransformer } from '../src/setTransformer';
import { TransformerConfig } from '../src/model/transformerConfig';
import { LineElementConfig } from '../src/model/lineElementConfig';

const expect = chai.expect;

describe('ListParser', () => {
  describe('constructor', () => {
    it('throws exception when transformerConfig is undefined', () => {
      expect(() => {
        let transformerConfig: TransformerConfig;
        const setTransformer: ISetTransformer = new SetTransformer(
          transformerConfig!
        );
      }).to.throw(ReferenceError);
    });
  });

  describe('groupBy', () => {
    it('throws exception when values is undefined', () => {
      expect(() => {
        let values: string[][];
        const key: number = 0;
        const select: number[] = [0, 1, 2];

        const setTransformer: ISetTransformer = new SetTransformer(
          new TransformerConfig(' ')
        );

        setTransformer.groupBy(values!, key, select);
      }).to.throw(ReferenceError);
    });

    it('throws exception when key is undefined', () => {
      expect(() => {
        const values: string[][] = [['foo', 'bar']];
        let key: number;
        const select: number[] = [0, 1, 2];

        const setTransformer: ISetTransformer = new SetTransformer(
          new TransformerConfig(' ')
        );

        setTransformer.groupBy(values, key!, select);
      }).to.throw(ReferenceError);
    });

    it('throws exception when select is undefined', () => {
      expect(() => {
        const values: string[][] = [['foo', 'bar']];
        const key: number = 0;
        let select: number[];

        const setTransformer: ISetTransformer = new SetTransformer(
          new TransformerConfig(' ')
        );

        setTransformer.groupBy(values, key, select!);
      }).to.throw(ReferenceError);
    });
  });
});
