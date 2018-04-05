import { ISetTransformer } from './interface/isetTransformer';
import { LineElementConfig } from './model/lineElementConfig';
import { TransformerConfig } from './model/transformerConfig';

export class SetTransformer implements ISetTransformer {
  private _transformerConfig: TransformerConfig;

  constructor(transformerConfig: TransformerConfig) {
    if (transformerConfig === undefined) {
      throw new ReferenceError('transformerConfig undefined');
    }
    this._transformerConfig = transformerConfig;
  }

  public groupBy(
    values: string[][],
    key: number,
    select: number[]
  ): string[][] {
    if (values === undefined) {
      throw new ReferenceError('values undefined');
    }
    if (key === undefined) {
      throw new ReferenceError('key undefined');
    }
    if (select === undefined) {
      throw new ReferenceError('select undefined');
    }

    throw new Error('Method not implemented.');
  }
}
