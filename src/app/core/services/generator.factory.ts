import { GeneratorService } from './generator';
import { InjectionToken } from '@angular/core';

export const RandomString = new InjectionToken<string>('RandomString');

export const GeneratorFactory = (n: number) =>
  (data: GeneratorService) => data.getString(n);
