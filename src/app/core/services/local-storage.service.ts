import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }
  setItem(key: string, value: any) {
    window.localStorage[key] = value;
  }

  getItem(key: string): any {
    return window.localStorage[key];
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
