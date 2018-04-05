import { IListParser } from './interface/ilistParser';
import { LineElementConfig } from './model/lineElementConfig';
import { TransformerConfig } from './model/transformerConfig';

export class ListParser implements IListParser {
  private _transformerConfig: TransformerConfig;

  constructor(transformerConfig: TransformerConfig) {
    if (transformerConfig === undefined) {
      throw new ReferenceError('transformerConfig undefined');
    }
    this._transformerConfig = transformerConfig;
  }

  public parseLine(line: string): string[] {
    if (line === undefined) {
      throw new ReferenceError('line undefined');
    }

    const basicElements = line
      .split(this._transformerConfig.lineSeparator)
      .filter(x => x.length > 0);

    if (this._transformerConfig.elementSeparatorConfig.length > 0) {
      return this.insertSplitElements(basicElements);
    }

    return basicElements;
  }

  private insertSplitElements(basicElements: string[]): string[] {
    let updatedElements = basicElements;

    this._transformerConfig.elementSeparatorConfig.forEach(config => {
      if (config.elementSeparator !== '') {
        const elementValues = this.getSplitElementValues(basicElements, config);

        updatedElements = this.insertElementValues(
          updatedElements,
          elementValues,
          config.index
        );
      }
    });
    return updatedElements;
  }

  private getSplitElementValues(
    basicElements: string[],
    lineElementConfig: LineElementConfig
  ): string[] {
    const rawSplitElements = basicElements[lineElementConfig.index]
      .split(lineElementConfig.elementSeparator)
      .filter(x => x.length > 0);

    const newElements = rawSplitElements.filter((v, i) =>
      lineElementConfig.instanceIndices.includes(i)
    );
    const restoredElements = rawSplitElements
      .filter((v, i) => !lineElementConfig.instanceIndices.includes(i))
      .join(lineElementConfig.elementSeparator);

    return newElements.concat(restoredElements);
  }

  private insertElementValues(
    updatedElements: string[],
    elementValues: string[],
    originalIndex: number
  ): string[] {
    const leftPart = updatedElements.slice(0, originalIndex);
    const rightPart = updatedElements.slice(
      originalIndex + 1,
      updatedElements.length
    );

    return leftPart.concat(elementValues, rightPart);
  }
}
