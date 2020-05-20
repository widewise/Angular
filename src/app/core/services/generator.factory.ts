import { GeneratorService } from './generator';
import { InjectionToken } from '@angular/core';

export const RandomString = new InjectionToken<string>('RandomString');

export function GeneratorFactory(n: number) {
  return function(data: GeneratorService): string {
    return data.getString(n);
  }
}
