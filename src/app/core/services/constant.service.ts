import { InjectionToken } from '@angular/core';

export const ConstantsServiceToken = new InjectionToken<ConstantsService>('ConstantsService');

export class ConstantsService {
  constructor(
    public App: string,
    public Ver: string) {}
}
