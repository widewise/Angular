import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], name: string, orderDirection: boolean): unknown {
    if (orderDirection)
    {
      return array.sort((a, b) => a[name] - b[name]);
    }
    return array.sort((a, b) => b[name] - a[name]);
  }
}
