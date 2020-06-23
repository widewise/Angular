import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], name: string, orderDirection: boolean): unknown {
    if (orderDirection)
    {
      return array.sort((a, b) => this.compare(a[name], b[name]));
    }
    return array.sort((a, b) => this.compare(b[name], a[name]));
  }

  private compare(first, second): number {
    if (first > second) {
      return 1;
    }

    if (first < second) {
        return -1;
    }

    return 0;
  }
}
