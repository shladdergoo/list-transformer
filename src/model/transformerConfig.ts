import { LineElementConfig } from './lineElementConfig';

export class TransformerConfig {
  private _lineSeparator: string;
  private _lineElements: LineElementConfig[];

  constructor(lineSeparator: string, lineElements: LineElementConfig[] = []) {
    this._lineSeparator = lineSeparator;
    this._lineElements = lineElements;
  }

  public get lineSeparator(): string {
    return this._lineSeparator;
  }

  public get lineElements(): LineElementConfig[] {
    return this._lineElements;
  }
}
