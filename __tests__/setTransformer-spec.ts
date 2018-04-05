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
});
