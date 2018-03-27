import { TransformerConfig } from '../src/model/transformerConfig';

export class ListParser {
  private _transformerConfig: TransformerConfig;

  constructor(transformerConfig: TransformerConfig) {
    this._transformerConfig = transformerConfig;
  }

  public parseLine(line: string): string[] {
    if (line == null) {
      throw new ReferenceError('line cannot be null');
    }

    return line
      .split(this._transformerConfig.lineSeparator)
      .filter(x => x.length > 0);
  }
}
