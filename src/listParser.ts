export class ListParser {
  public parseLine(line: string): string[] {
    if (line == null) {
      throw new ReferenceError('line cannot be null');
    }

    return line.split(' ').filter(x => x.length > 0);
  }
}
