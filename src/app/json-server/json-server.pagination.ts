export class JsonServerPagination {
  last!: number;
  constructor(input: string) {
    if (input) {
      const paths = input.split('?');
      const pathsWithLastPage = paths.find((p) => p.includes('last'));
      const match = (pathsWithLastPage?.match(
        /_page=([0-9]+)/,
      ) as RegExpMatchArray) ?? [0, 1];
      this.last = +match[1];
    } else {
      this.last = 1;
    }
  }
}
