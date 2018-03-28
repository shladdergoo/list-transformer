import { TransformerConfig } from './model/transformerConfig';

export class ListParser {
  private _transformerConfig: TransformerConfig;

  constructor(transformerConfig: TransformerConfig) {
    this._transformerConfig = transformerConfig;
  }

  public parseLine(line: string): string[] {
    if (line == null) {
      throw new ReferenceError('line cannot be null');
    }

    const basicElements = line
      .split(this._transformerConfig.lineSeparator)
      .filter(x => x.length > 0);

    if (this._transformerConfig.lineElements.length > 0) {
      return this.insertSplitElements(basicElements);
    }

    return basicElements;
  }

  private insertSplitElements(basicElements: string[]): string[] {
    let updatedElements = basicElements;

    this._transformerConfig.lineElements.forEach(config => {
      if (config.elementSeparator !== '') {
        const elementValues = basicElements[config.index]
          .split(config.elementSeparator)
          .filter(x => x.length > 0);

        updatedElements = this.insertElementValues(
          updatedElements,
          elementValues,
          config.index
        );
      }
    });
    return updatedElements;
  }

  private insertElementValues(
    updatedElements: string[],
    elementValues: string[],
    originalIndex: number
  ): string[] {
    const leftPart = updatedElements.slice(0, originalIndex);
    const rightPart = updatedElements.slice(
      originalIndex + 1,
      updatedElements.length - 1
    );

    return leftPart.concat(elementValues, rightPart);
  }
}
