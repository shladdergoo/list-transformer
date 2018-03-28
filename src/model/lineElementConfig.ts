export class LineElementConfig {
  private _index: number;
  private _elementSeparator: string;
  private _instanceIndices: number[];

  constructor(
    index: number,
    elementSeparator: string,
    instanceIndices: number[]
  ) {
    this._index = index;
    this._elementSeparator = elementSeparator;
    this._instanceIndices = instanceIndices;
  }

  public get index(): number {
    return this._index;
  }

  public get elementSeparator(): string {
    return this._elementSeparator;
  }

  public get instanceIndices(): number[] {
    return this._instanceIndices;
  }
}
