export class TransformerConfig {
  private _lineSeparator: string;

  constructor(lineSeparator: string) {
    this._lineSeparator = lineSeparator;
  }

  public get lineSeparator(): string {
    return this._lineSeparator;
  }
}
