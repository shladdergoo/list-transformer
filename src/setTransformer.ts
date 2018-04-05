import { ISetTransformer } from './interface/isetTransformer';
import { LineElementConfig } from './model/lineElementConfig';
import { TransformerConfig } from './model/transformerConfig';

export class SetTransformer implements ISetTransformer {
  private _transformerConfig: TransformerConfig;

  constructor(transformerConfig: TransformerConfig) {
    if (!transformerConfig) {
      throw new ReferenceError('transformerConfig undefined');
    }
    this._transformerConfig = transformerConfig;
  }

  public groupBy(
    values: string[][],
    key: number,
    select: number[]
  ): string[][] {
    throw new Error('Method not implemented.');
  }
}
