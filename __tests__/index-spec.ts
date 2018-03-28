import * as chai from 'chai';
import 'mocha';

import * as index from '../src/index';

const expect = chai.expect;

describe('index', () => {
  it('Should have Greeter available', () => {
    expect(index.Greeter).to.not.be.undefined;
  });
});
