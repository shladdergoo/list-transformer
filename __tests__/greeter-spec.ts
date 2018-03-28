import * as chai from 'chai';
import 'mocha';

import { Greeter } from '../src/greeter';

const expect = chai.expect;

describe('Greeter', () => {
  it('should return greeting', () => {
    const greeter = new Greeter('friend');
    expect(greeter.greet()).to.equal('Bonjour, friend!');
  });
});
