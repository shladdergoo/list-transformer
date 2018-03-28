export class LineElementConfig {
  private _index: number;
  private _elementSeparator: string;

  constructor(index: number, elementSeparator: string) {
    this._index = index;
    this._elementSeparator = elementSeparator;
  }

  public get index(): number {
    return this._index;
  }

  public get elementSeparator(): string {
    return this._elementSeparator;
  }
}
